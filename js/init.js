import {Comunication} from "./comunication.js";
import {Master} from "./master.js";
import {Client} from "./client.js";

let control = null;
let comunication = new Comunication();
comunication.init({
    ip: "localhost",
    port: "8023"
});
