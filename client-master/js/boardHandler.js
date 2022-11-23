import {Cell} from "./cell.js"
function createBoard(){
    let width = 10;
    let height = 10;
    let board = Array.from({ length:height }, () => (
        Array.from({ length:width }, ()=> new Cell(1))
    ))
    console.log(board);
}

export {createBoard};