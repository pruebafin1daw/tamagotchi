import {Communication} from "./communication.js";

class Client {
    active = false;
    map = null;
    
    init(comunication) {
        this.comunication = comunication;
        this.comunication.handler = this;
        this.comunication.send("nuevo",Communication.MASTER);
    }

    newMsg(msg,origin) {
        console.log(msg);
    }
}

export {Client};