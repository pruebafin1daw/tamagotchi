import {Comunication} from "./comunication.js";
import {Master} from "./game.js";
import {Client} from "./game.js";

let control = null;
let comunication = new Comunication();
comunication.init({
    ip : "localhost",
    port : "8023",
    check : hola
});

function hola() {
    if(comunication.master){
        control = new Master();
    }
    else{
        control = new Client();
    }
    control.init();
}

