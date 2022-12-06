import {Communication} from "./js/communication.js";
import {Master} from "./js/master.js";
import {Client} from "./js/client.js";

let control = null;
let communication = new Communication();
communication.init({
    ip : "localhost",
    port : "8023",
    check : hello
});

function hello() {
    if(communication.master) {
        control = new Master();
        control.init({
            width: 11,
            height: 11,
            porcentageBurrow : 0.2,
            lifeTakenDamage : 10,
            lifeRestoredBurrow : 10,
            lifeRestoredAlone : 2
        }, communication);
    }
    else {
        control = new Client();
        control.init(communication.id, communication);
    }
}
