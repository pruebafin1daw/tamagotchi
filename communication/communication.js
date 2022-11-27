class Communication {
    socket = null;
    state = false;
    master = false;
    init(config) {
        this.socket = new WebSocket(`ws://${config.ip}:${config.port}`);

        this.socket.onopen = (e) => {
            this.state = true;

            const msg = {
                "tipo" : 0,
                "mensaje" : "master"
            }

            this.socket.send(JSON.stringify(msg));
        };

        this.socket.onmessage = (event) => {
            console.log(`[message] Datos recibidos del servidor: ${event.data}`);

            let objeto = JSON.parse(event.data);
            
            switch(objeto.valor) {
                case "master":
                    this.master = true;
                break;
            }

            config.check();
        };

        this.socket.onclose = (event) => {
            this.state = false;
        };

        this.socket.onerror = (error) => {
            this.state = false;
        };

        this.close = function() {
            this.socket = null;
            this.state = false;
        }
    }
}

export { Communication };