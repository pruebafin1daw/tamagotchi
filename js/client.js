import {Communication} from "./communication.js";

class Client {
    active = false;
    map = null;
    
    init(comunication) {
        this.comunication = comunication;
        this.comunication.handler = this;
        //TO DO Conseguir nombre de jugador
        this.comunication.send("nuevo",Communication.MASTER);
        //TO DO Ahi va mensaje hacia todos de nueva conexion
        this.comunication.send("nuevo",Communication.ALL);
        
    }
    // Funcion llamada en default case en communication
    newMsg(msg,origin) {
        console.log(msg);
    }
}

export {Client};