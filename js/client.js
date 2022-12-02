import {Communication} from "./communication.js";

class Client {
    active = false;
    map = null;
    
    init(comunication, id) {
        this.id = id;
        this.comunication = comunication;
        this.comunication.handler = this;
        this.comunication.send("nuevo",id);
    }

    newMsg(msg,origin) {
        console.log(msg);
    }
}

export {Client};