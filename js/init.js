import {Comunication} from "./comunication.js";
import {Master} from "./master.js";
import {Client} from "./client.js";

let control = null;
let comunication = new Comunication();
comunication.init({
    ip: "localhost",
    port: "8023",
    check: hola
});
if (comunication.master) {
    console.log("soy el master");
}
function hola() {
    if (comunication.master) {
        control = new Master();
    }
    else {
        control = new Client();
    }
    control.init();
}