import {Cell} from "./cell.js";
import {Player} from "./player.js";
import * as board from "./boardHandler.js";
let socket = new WebSocket("ws://localhost:8023");
socket.onmessage = () => alert("adasd");

let cell = new Cell(1);
let player = new Player();

board.createBoard()