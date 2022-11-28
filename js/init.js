import {Comunication} from "./comunication.js";

let control = null;
let comunication = new Comunication();
comunication.init({
    ip: "localhost",
    port: "8023"
});
comunication.onOpen();