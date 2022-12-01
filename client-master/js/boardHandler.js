import {Cell} from "./cell.js"
import {Player} from "./player.js";
import {checkCollision} from "./collisionChecker.js";
class Board{
    blankCell = 1;
    burrow = 2;
    goal = 3;

    cellTypes = {
        1: "O",
        2: "#",
        3: "G",
    }
    
    board = null;
    width = null;
    height = null;
    players = [];
    
    gameThread = null;
    generator = null;
    
    communication = null;
    
    // QUITAR
    * idGenerator(){
        let i = 1;
        while(true){
            yield i;
            i++;
        }
    }
    
    init(config){
        this.communication = config.communication,
        this.width = config.width;
        this.height = config.height;
        this.createBoard();
        this.communication.activateMessages();
        this.startGame();
    }
    
    createBoard(){
        this.board = Array.from({ length:this.height }, () => (
            Array.from({ length:this.width }, ()=> new Cell(this.blankCell))
        ))
        this.generateBurrows();
        this.generateGoal();
    }
    
    generateBurrows(){
        this.board = this.board.map(row => {
            return row.map(cell =>{
                if(Math.random() < 0.2) {
                    return new Cell(this.burrow);
                } else return cell;
            });
        });
    }
    
    generateGoal(){
        let ycenter = Math.floor(this.height / 2);
        let xcenter = Math.floor(this.width / 2);
        if(this.height % 2){
    
        }else{
            this.board[ycenter][xcenter] = new Cell(this.goal);
        }
        
    }
    
    addPlayer(nickname, clientId){
        let y = Math.floor(Math.random() * this.height);
        let x = Math.floor(Math.random() * this.width);
        let newPlayer = new Player({
            clientId: clientId,
            nickname: nickname,
            posX: x,
            posY: y
        });
        // FIXEAR ESTO
        for (const player of this.players) {
            while(newPlayer.haveSameCoords(player)){
                y = Math.floor(Math.random() * this.height);
                x = Math.floor(Math.random() * this.width);
                newPlayer.posX = x;
                newPlayer.posY = y;
            }
        }
        this.players.push(newPlayer);
        this.communication.sendId({
            type: "player",
            player: newPlayer
        }, clientId);
        return newPlayer;
    }
    
    startGame(){
        this.gameThread = setInterval(() =>{
            this.communication.send({
                type: "draw",
                board: [...this.board]
            }, this.communication.CLIENTS)
            this.drawBoard();
        }, 100)
    }
    
    stopGame(){
        clearInterval(this.gameThread);
    }
    
    drawBoard(){
        // Copy of board
        let boardCopy = this.board.map(cell => {return [...cell]})
        
        for (const player of this.players) {
            boardCopy[player.posY][player.posX] = player;
        }
        let container = document.getElementById("container");
        this.removeAllChildNodes(container);
    
        for (const row of boardCopy) {
            let rowDiv = document.createElement("div");
            rowDiv.classList.add("row");
            for (const square of row) {
                let squareDiv = document.createElement("div");
                squareDiv.classList.add("cell");
                if(square.constructor.name == "Cell"){
                    squareDiv.innerHTML = this.cellTypes[square.type];
                }else{
                    squareDiv.classList.add("player");
                    squareDiv.innerHTML = "P";
                }
                rowDiv.appendChild(squareDiv);
            }
            container.appendChild(rowDiv);
        }
    }
    
    removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    
    findPlayer(clientId){
        for (const player of this.players) {
            console.log(player.clientId + "   |   " + clientId);
            if(player.clientId == clientId){
                return player;
            }
        }
    }
    
    movePlayer(movementData){
        // Move player
        let player = this.findPlayer(movementData.playerId);
        console.log(player);
        let collisioned = checkCollision(player, movementData.direction, this.width, this.height, this.board);
    
        if(!collisioned) player.move(movementData.direction);
    
        // Send position to all player
        this.communication.sendId({
            type: "playerMovement",
            posX: player.posX,
            posY: player.posY
        }, player.clientId);
    }
}


export {Board};