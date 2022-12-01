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
            width: 5,
            height: 5,
            difficulty: 0.2
        }, communication);
    }
    else {
        control = new game.Client();
        control.init(mainDiv, communication, id);
        setMovement(control);
    }    
}

function setMovement(control) {
    //Mensaje que manda al master 
    const msg = {
        type: 'move',
        playerId: control.id
    }

    document.addEventListener('keydown', (event) => {
        switch(event.code){
            case "ArrowUp":
                msg.direction = 'up';                
                communication.send(msg, 0);
                break;
            case "ArrowRight":
                msg.direction = 'right';
                communication.send(msg, 0);
                break;
            case "ArrowDown":
                msg.direction = 'down';
                communication.send(msg, 0);
                break;
            case "ArrowLeft":
                msg.direction = 'left';
                communication.send(msg, 0);
                break;
        }
    });
}








