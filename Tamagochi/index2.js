import {Tablero} from "./tablero.js";
import {Comunication} from "./js/comunication.js";
import {Jugador} from "./jugador.js";
let jugador = new Jugador();
let comunication = new Comunication();
let control = null;
comunication.init({
    ip : "localhost",
    port : "8023",
    check : entidad
});

function entidad(){
    if(comunication.master){
        control = new Master();
    }
    else {
        control = new Client();
    }
    control.init();
}
let tablero = new Tablero();
tablero.crearMapa();
tablero.dibujaMapa();
tablero.añadirJugador(jugador);