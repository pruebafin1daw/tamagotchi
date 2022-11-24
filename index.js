import { Communication } from "./communication/communication.js";

let control = null;
let comunication = new Communication();
comunication.init({
    ip : "localhost",
    port : "8023",
    check : hola
});
if(comunication.master) {
    console.log("soy el master");
}
function hola() {
    if(comunication.master){
        control = new Master();
    }
    else {
        control = new Client();
    }
    control.init();
}