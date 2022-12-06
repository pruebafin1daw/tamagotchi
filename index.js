import { Communication } from "./communication/communication.js";
import { game } from "./game/game.js";

let mainDiv = 'mainDiv';

//Crea comunicaciones
let control = null;
let communication = new Communication();
communication.init({
    ip: "localhost",
    port: "8023",
    check: eval(checkMaster),
});

//Comprueba si el usuario es master
function checkMaster(id) {
    if(communication.master){
        control = new game.Master();
        control.init(mainDiv, {
            width: 15,
            height: 15,
            difficulty: 1
        }, communication);
    } else {
        control = new game.Client();
        control.init(mainDiv, communication, id);
    }    
}