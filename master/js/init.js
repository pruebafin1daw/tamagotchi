import { Board } from './board.js';
import { Player } from './player.js';

// BOARD
let board = new Board();
board.init({
    'boardLength': 11 // CHANGE FOR MASTER CHOICE (SQUARE)
})

console.log(board.board)