const game_moderator = document.querySelector('.game-moderator')
let player1_score = document.querySelector('.player1score')
let player2_score = document.querySelector('.player2score')
let grid = Array.prototype.slice.call(document.querySelectorAll('.grid'))
let grid_item = Array.prototype.slice.call(document.querySelectorAll('.grid-item'))
let player1_turn = true
let matrix = Array(3)
let win = false
let line_type;


function xo_enter_hover() {
    if (player1_turn) {
        this.classList.add('x')
    }
    else {
        this.classList.add('o')
    }
}


function xo_leave_hover() {
    if (player1_turn) {
        this.classList.remove('x')
    }
    else {
        this.classList.remove('o')
    }
}


function xo_onclick_event_listener() {
    for (i=0; i<grid.length; i++) {
        grid[i].addEventListener("click", render_choice, false)
        grid[i].addEventListener("mouseenter", xo_enter_hover, false)
        grid[i].addEventListener("mouseleave", xo_leave_hover, false)
    }
}


function create_empty_matrix() {
    for (i=0; i<matrix.length; i++) {
        matrix[i] = Array(3)
    }
}


function render_choice() {
    if (player1_turn) {
        update_matrix(this, 1)
        this.classList.add('x')
        player1_turn = false
    }
    else {
        update_matrix(this, 0)
        this.classList.add('o')
        player1_turn = true
    }
    this.removeEventListener("click", render_choice)
    this.removeEventListener("mouseenter", xo_enter_hover)
    this.removeEventListener("mouseleave", xo_leave_hover)
}


function update_matrix(item, player_sign) {
    const element_index = get_element_index(item)
    const row = Math.floor(element_index/3)
    const col = element_index%3
    matrix[row][col] = player_sign
    check_winner(row, col, player_sign)
}


function get_element_index(item) {
    let i = 0
    while (item !== grid[i]) {
        i++
    }
    return i
}


function check_winner(row, col, player_sign) {
    if (matrix[0][col] == player_sign && matrix[1][col] == player_sign && matrix[2][col] == player_sign) {
        win = true
        render_line(row, col, 'straight-line')
    }
    else if (matrix[row][0] == player_sign && matrix[row][1] == player_sign && matrix[row][2] == player_sign) {
        win = true
        render_line(row, col, 'horizontal-line')
    }
    else if (row == col && matrix[0][0] == player_sign && matrix[1][1] == player_sign && matrix[2][2] == player_sign) {
        win = true
        render_line(row, col, 'backslash-line')
    }
    else if (matrix[2][0] == player_sign && matrix[1][1] == player_sign && matrix[0][2] == player_sign) {
        win = true
        render_line(row, col, 'slash-line')
    }
    if (win) {
        for (i=0; i<grid.length; i++) {
            grid[i].removeEventListener("click", render_choice)
            grid[i].removeEventListener("mouseenter", xo_enter_hover)
            grid[i].removeEventListener("mouseleave", xo_leave_hover)
        }
        if (player1_turn) {
            player1_score.innerHTML = parseInt(player1_score.innerHTML) + 1
        }
        else {
            player2_score.innerHTML = parseInt(player2_score.innerHTML) + 1
        }
    }
}


function render_line(row, col, direction) {
    line_type = direction
    const line = document.createElement('div')
    line.classList.add(direction)
    switch (direction) {
        case 'straight-line':
            grid_item[col].appendChild(line)
            break;
        case 'horizontal-line':
            grid_item[row*3].appendChild(line)
            break;
        case 'backslash-line':
            grid_item[0].appendChild(line)
            break;
        case 'slash-line':
            grid_item[2].appendChild(line)
    }
}


function start_game() {
    xo_onclick_event_listener()
    create_empty_matrix()
    game_moderator.innerHTML = "Restart"
}


function reset_game() {
    for (i=0; i<grid.length; i++) {
        grid[i].classList.remove('x', 'o')
    }
    create_empty_matrix()
    xo_onclick_event_listener()
    player1_turn = true
    if (win) {
        let ele = document.getElementsByClassName(line_type)
        ele[0].parentNode.removeChild(ele[0])
        win = false
        }
}  


function game() {
    if (game_moderator.innerHTML == 'Start Game') {
        start_game()
    }
    else if (game_moderator.innerHTML == 'Restart') {
        reset_game()
    }
}


function main() {
    game_moderator.addEventListener("click", game, false)
}


main()