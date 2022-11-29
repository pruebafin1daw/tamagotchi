import { Master } from "./master.js";
import { Player } from "./player.js";

var socket;

function init(config) {
    socket = new WebSocket(`ws://${config.ip}:${config.port}`);
}

function onMessage() {
    socket.onmessage = (e) => {
        let master;
        if (JSON.parse(e.data).client == "master") {
            localStorage.setItem('master', JSON.stringify(new Master()));
        } else {
            master = JSON.parse(localStorage.getItem('master'));
            master.addPlayer(new Player());
            master.getPlayers();
        }
    }
}

export {init, onMessage};