import { Board } from "./board.js";

class Communication {
    constructor() {
        this.MASTER = 0;
        this.CLIENTS = 1;
        this.clients = [];
        this.board = null;
        this.socket = null;
        this.state = false;
    }

    init(config) {
        this.socket = new WebSocket(`ws://${config.ip}:${config.port}`);
        this.socket.onopen = (e) => {
            this.state = true;
            this.board = new Board({
                width: config.dimensions.width,
                height: config.dimensions.height,
                communication: this
            });
        };

        this.socket.onclose = (event) => {
            this.state = false;
        };

        this.socket.onerror = (error) => {
            this.state = false;
        };
    }

    send(data, type) {
        const msg = {
            type,
            message: data
        }
        this.socket.send(JSON.stringify(msg));
    }

    sendId(data, id) {
        const msg = {
            id,
            mensaje: data
        }
        this.socket.send(JSON.stringify(msg));
    }

    listenMessages() {
        this.socket.onmessage = (e) => {
            let data = JSON.parse(e.data);
            switch(data.value.type) {
                case "newPlayer":
                    let player = this.board.addPlayer(data.value.id, data.value.name);
                    this.clients.push({
                        id: data.value.id,
                        player
                    });
                    break;
            }
        }
    }
}

export { Communication };