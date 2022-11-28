class Comunication {
    constructor() {
        this.socket = null;
        this.state = false;
        this.master;
    }

    init(config) {
        this.socket = new WebSocket("ws://" + config.ip + ":" + config.port);

        this.socket.onmessage = (event) => {
            this.master = false;
            console.log(event);
            console.log(`[message] Datos recibidos del servidor: ${JSON.parse(event.data).value}`);
        };

        this.socket.onclose = (event) => {
            this.state = false;
        };

        this.socket.onerror = (error) => {
            this.state = false;
        };
    }

    sendMessage() {
        const msg = {
            "type": "1",
            "message": "new connection"
        }
        this.socket.send(JSON.stringify(msg));
    }

    onOpen() {
        this.socket.onopen = (e) => this.sendMessage();
    }
}

export { Comunication };