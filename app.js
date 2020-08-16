const game_moderator = document.querySelector('.game-moderator')
var grid = Array.prototype.slice.call(document.querySelectorAll('.grid'))
let player1_turn = true
let matrix = Array(3)


function get_element_index(item) {
    let i = 0
    while (item !== grid[i]) {
        i++
    }
    return i
}


function check_winner() {

}

function create_empty_matrix() {
    for (i=0; i<matrix.length; i++) {
        matrix[i] = Array(3)
    }
}

function update_matrix(element_index) {
    const row = Math.floor(element_index/3)
    const col = element_index%3
    if (player1_turn == false) {
        matrix[row][col] = 1
    }
    else if (player1_turn == true) {
        matrix[row][col] = 0
    }
    console.log(matrix)
}

function render_choice() {
    if (player1_turn) {
        this.classList.add('x')
        player1_turn = false
    }
    else {
        this.classList.add('o')
        player1_turn = true
    }
    const element_index = get_element_index(this)
    update_matrix(element_index)
    check_winner()
    this.removeEventListener("click", render_choice)
}

function xo_onclick_event_listener() {
    for (i=0; i<grid.length; i++) {
        grid[i].addEventListener("click", render_choice, false)
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