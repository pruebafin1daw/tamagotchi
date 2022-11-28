import { Communication } from "./communication/communication.js";
import { game } from "./game/user.js";

let mainDiv = 'mainDiv';

//Crea comunicaciones
let control = null;
let communication = new Communication();
communication.init({
    ip: "localhost",
    port: "8023",
    check: checkMaster,
});

//Comprueba si el usuario es master
function checkMaster() {
    if(communication.master){
        control = new game.Master();
    }
    else {
        control = new game.Client();
    }
    control.init(mainDiv, terminate);
}

function terminate(errorMsg) {
    communication.close();
}


