import {Cell} from "./cell.js";
import {Player} from "./player.js";
let socket = new WebSocket("ws://localhost:8023");

socket.onopen = function(e) {
    alert("Enviando al servidor");
    const msg = {
        "tipo" : 0,
      "mensaje" : "he entrado",
    }
    socket.send(JSON.stringify(msg));
};


let cell = new Cell(1);
let player = new Player();

console.log(cell);