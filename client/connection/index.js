import { Connection } from "./connection.js";

let control = null;
let connection = new Connection();

connection.init({
    ip: 'localhost',
    port: '8023',
    check: checkControl
});

function checkControl() {
    if (connection.master) control = new Master();
    else control = new Client();
    control.init();
}