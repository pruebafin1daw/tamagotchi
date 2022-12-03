import {Communication} from "./communication.js";

class Client {
    active = false;
    map = null;
    
    init(comunication) {
        this.comunication = comunication;
        this.comunication.handler = this;
        //TO DO Conseguir nombre de jugador
        this.comunication.send("Datos hacia master",Communication.MASTER);
        //TO DO Ahi va mensaje hacia todos de nueva conexion
        this.comunication.send("nuevo",Communication.ALL);                                
        
    }
    // Funcion llamada en default case en communication al llegar un mensaje nuevo
    newMsg(msg,origin) {
        switch (msg.valor) {
            case "nuevo":
                console.log("Nuevo usuario conectado")
                break;
            //Aquí recibe los datos del jugador mandado por maestro
            //A tratar como veamos conveniente, solo estoy mostrando el id
            default:
                let player = JSON.parse(msg.valor);
                console.log(player.origin);
                break;
        }        
        console.log("This was a client message");
    }
}

export {Client};