import {Cell} from "./cell.js";
import {Player} from "./player.js";
import * as board from "./boardHandler.js";


let socket = new WebSocket("ws://localhost:8023");
socket.onmessage = (event) => {
    let data = JSON.parse(event.data);

    if(typeof data.valor == 'object'){
        switch(data.valor.type){
            case "newPlayer":
                board.addPlayer(data.valor.nickname);
                break;
            case "move":
                board.movePlayer(data.valor)
                break;
        }
    }
}

board.init({
    burrowNumber: 8, 
    width: 10,
    height: 10,
    socket: socket
});