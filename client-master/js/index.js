import * as board from "./boardHandler.js";
import {Communication} from "./communication.js";

let communication = new Communication();
communication.init({
    ip: "localhost",
    port : "8023"
});