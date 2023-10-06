/*----- constants -----*/
const COLORS = {
    '0': 'white',
    '1': 'orange',
    '-1': 'black'
};

/*----- state variables -----*/
const state = {
    board: null,
    turn: null,
    winner: null
};

/*----- cached elements  -----*/
const elements = {
    message: document.querySelector('h1'),
    playAgain: document.querySelector('button'),
    markers: document.querySelectorAll('#markers > div')
};

/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleDrop);

/*----- functions -----*/
init();

function init() {
    // To visualize the baord, roate the array 90 deg anticlockwise
    state.board = [
        [0, 0, 0, 0, 0, 0], //column 0
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0], //column 6
    ];
    state.turn = 1;
    state.winner = null;
    render();
}

function handleDrop(event) {
    // find the column number
    console.log('drop detected');
    const columnIndex = [...elements.markers].indexOf(event.target);
    if (columnIndex === -1) {
        return; //exit the function (so the rest doesn't get mad)
    }
    // find the column data
    const column = state.board[columnIndex];
    // find the first empty slot (0) in that column
    const rowIndex = column.indexOf(0);
    // asign that slot to the current player
    column[rowIndex] = state.turn;
    // change to the next player
    state.turn *= -1; // 1, -1, 1, -1, 1, -1
    // check for a winner?
    checkWinner();
    render();
}

function checkWinner(row, column) {
    checkVertical(row, column);
    checkHorizontal(row, column);
    checkDiagonalUpperLeftToBottomRight(row, column);
    checkDiagonalBottomLeftToUpperRight(row, column);
}


function render() {
    renderBoard();
    renderMessage();
    renderControls();
}

function renderBoard() {
    state.board.forEach(function (column, columnIndex) {
        column.forEach(function(piece, rowIndex){
            const id = 'c${ columnIndex }r${ rowIndex }';
            const circle = document.getElementById(id);
            circle.style.backgroundColor = COLORS[piece];
        })
    })
}

function renderMessage() {
    //TODO: show winner
    //TODO: show tie
    elements.message.innerHTML = `<span style="color:${ COLORS[state.turn] }">${ COLORS [state.turn] }</span>`
    console.log('rendering message')
}

function renderControls() {
    console.log('rendering controls')
}