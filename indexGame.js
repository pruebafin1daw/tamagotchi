import{Game} from "./game.js";
import {Communication} from "./communication.js"
console.log("Hola");
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
        control=new Maestro(); //Hay q crearlo
    } else {
        control=new Cliente(); //Hay q crearlo
    }
}

let game=new Game();
game.drawBoard();