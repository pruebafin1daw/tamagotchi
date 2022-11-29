import {init, onMessage} from "./client.js";

init({
    ip: "localhost",
    port: "8023"
});
onMessage();