import { Board } from "./board.js";

class Communication {
    MASTER = 0;
    CLIENTS = 1;
    clients = [];
    board = null;
    socket = null;
    state = false;

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

        this.socket.onclose = (event)=> {
            this.state = false;
        };

        this.socket.onerror = (error)=> {
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

        }
    }
}

export {Communication};