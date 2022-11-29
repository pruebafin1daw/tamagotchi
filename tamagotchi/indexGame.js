import{Game} from "./game.js";
import {Communication} from "./communication.js"
import { Player } from "./player.js";
let configuration = {
    "players" : [
        {
            "idPlayer": "1",
            "vida" : "100",
        },
        {
            "idPlayer": "2",
            "vida" : "100",
        },
        {
            "idPlayer": "3",
            "vida" : "100",
        },
    ]
}
let control=null;
let communication=new Communication();
communication.init({
    ip: "localhost",
    port: "8023",
    check : pruebaMensaje
});

function pruebaMensaje(){
    if(communication.master){
        control=new Maestro(); 
    } else {
        control=new Cliente(); 
    }
}
let player1=new Player();
let game=new Game();
game.addEntity();
game.createMap();
game.addPlayer(player1);