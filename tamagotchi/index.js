import {Comunication} from "./js/comunication.js";
import{Master} from "./js/Master/master.js";
import {Jugador} from "./js/Jugador/jugador.js";
let control = null;
let comunication = new Comunication();
comunication.init({
    ip : "localhost",
    port : "8023",
    check : hola
});

if(comunication.master) {
    console.log("soy el master");
}

function hola() {
    if(comunication.master){
        control = new Master(10);
        
    }
    else {
        control = new Jugador();
        console.log("eres el cliente");
    }
    control.init();
}