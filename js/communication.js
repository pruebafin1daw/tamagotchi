import { Board } from "./board.js";

class Communication {
    socket = null;
    state = false;
    board = null;
    master = false;
    handler = null;
    init(config) {
        this.socket = new WebSocket("ws://" + config.ip + ":" + config.port);
        this.socket.onopen = (e) => {
            this.state = true;
        };
        this.socket.onmessage = (event) => {
            let objeto = JSON.parse(event.data);
            console.log(objeto.valor);
            switch (objeto.valor) {
                case "master":
                    this.master = true;
                    config.check(); //#2
                    break;
                case "player":
                    config.check(objeto.id);
                    break;
                case "move":
                    this.board = new Board();
                    this.board.init();
                    break;
                // default:
                //     if (this.handler) {
                //         this.handler.newMsg(objeto, event.origin);
                //     }
            }
        };
        this.socket.onclose = (event) => {
            this.state = false;
        };
        this.socket.onerror = (error) => {
            this.state = false;
        };
    }

    static get MASTER() {
        return 0;
    }

    static get ALL() {
        return 1;
    }

    set handler(newHandler) {
        this._handler = newHandler;
    }

    get handler() {
        return this._handler;
    }

    send(data, type) {
        const msg = {
            tipo: type,
            message: data
        }           
        this.socket.send(JSON.stringify(msg));
    }

    sendId(id, data) {
        const msg = {
            id,
            message: data, 
            tipo: 'unico'
        }
        this.socket.send(JSON.stringify(msg));
    }
}

export { Communication };