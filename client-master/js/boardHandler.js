import {Cell} from "./cell.js"
import {Player} from "./player.js";
import {checkCollision} from "./collisionChecker.js";

const blankCell = 1, burrow = 2, goal = 3;
let cellTypes = {
    1: "O",
    2: "#",
    3: "G",
}

let board = null;
let width = null;
let height = null;
let players = [];

let socket = null;
let gameThread = null;
let generator = null;

function* idGenerator(){
    let i = 1;
    while(true){
        yield i;
        i++;
    }
}

function init(config){
    generator = idGenerator();
    socket = config.socket;
    width = config.width;
    height = config.height;
    createBoard(config.burrowNumber)
    startGame();
}

function createBoard(burrowNumber){
    board = Array.from({ length:height }, () => (
        Array.from({ length:width }, ()=> new Cell(blankCell))
    ))
    
    generateBurrows(burrowNumber, width, height, board);
}

function generateBurrows(burrowNumber){
    let cont = 0;
    while(cont < burrowNumber){
        let y = Math.floor(Math.random() * height);
        let x = Math.floor(Math.random() * width);

        if(board[y][x].type != burrow){
            board[y][x] = new Cell(burrow);
        }
        cont++;
    }
}

function addPlayer(nickname){
    let y = Math.floor(Math.random() * height);
    let x = Math.floor(Math.random() * width);
    let newPlayer = new Player({
        id: generator.next().value,
        nickname: nickname,
        posX: x,
        posY: y
    });

    // FIXEAR ESTO
    for (const player of players) {
        while(newPlayer.haveSameCoords(player)){
            y = Math.floor(Math.random() * height);
            x = Math.floor(Math.random() * width);
            newPlayer.posX = x;
            newPlayer.posY = y;
        }
    }
    players.push(newPlayer);
    const message = {
        "tipo" : 1,
        "mensaje" : {
            type: "player",
            player: newPlayer
        },
    }
    socket.send(JSON.stringify(message));
}

function startGame(){
    gameThread = setInterval(() =>{
        const message = {
            "tipo" : 1,
            "mensaje" :{
                type: "draw",
                board: [...board]
            }
        }
        socket.send(JSON.stringify(message));
        drawBoard();
    }, 100)
}

function stopGame(){
    clearInterval(gameThread);
}

function drawBoard(){
    // Copy of board
    let boardCopy = board.map(cell => {return [...cell]})
    
    for (const player of players) {
        boardCopy[player.posY][player.posX] = player;
    }
    let container = document.getElementById("container");
    removeAllChildNodes(container);

    for (const row of boardCopy) {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        for (const square of row) {
            let squareDiv = document.createElement("div");
            squareDiv.classList.add("cell");
            if(square.constructor.name == "Cell"){
                squareDiv.innerHTML = cellTypes[square.type];
            }else{
                squareDiv.innerHTML = "P";
            }
            rowDiv.appendChild(squareDiv);
        }
        container.appendChild(rowDiv);
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function findPlayer(playerId){
    for (const player of players) {
        if(player.id == playerId){
            return player;
        }
    }
}

function movePlayer(movementData){
    // Move player
    let player = findPlayer(movementData.playerId);
    let collisioned = checkCollision(player, movementData.direction, width, height, board);

    if(!collisioned) player.move(movementData.direction);

    // Send position to all player
    let message = {
        tipo: 1,
        mensaje: {
            type: "playerMovement",
            posX: player.posX,
            posY: player.posY
        }
    }
    socket.send(JSON.stringify(message))
}

export {init, addPlayer, movePlayer};