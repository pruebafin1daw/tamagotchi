import {Communication} from "./js/communication.js";
import {Master} from "./js/master.js";
import {Client} from "./js/client.js";

let control = null;
let communication = new Communication();
console.log(communication);
communication.init({
    ip : "localhost",
    port : "8023",
    check : hello
});

function hello() {
    if(communication.master){
        control = new Master();
        //TO DO Introducir las preguntas
        control.init({            
            width: 51,
            height: 51,
            porcentage : 0.2
        },communication);
    }
    else {
        control = new Client();
        //TO DO Introducir nombre
        control.init(communication);
    }
}