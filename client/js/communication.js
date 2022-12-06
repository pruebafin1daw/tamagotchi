class Communication {
    constructor() {
        this.MASTER = 0;
        this.CLIENTS = 1;
        this.board = null;
        this.id;
        this.socket = null;
        this.state = false;
    }

    init(config) {
        this.socket = new WebSocket(`ws://${config.ip}:${config.port}`);
        this.socket.onopen = (e)=> {
            this.state = true;
        };
        this.socket.onmessage = (e) => {
            let data = JSON.parse(e.data);
            switch(data.type) {
                case "newPlayer":
                    let name = prompt('Introduce your name');
                    this.id = data.id;
                    this.send({
                        id: this.id,
                        type: "newPlayer",
                        name
                    }, this.MASTER);
                break;
            }
        }
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
}

export {Communication};