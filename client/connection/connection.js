class Comunication {
    socket = null;
    state = false;
    master = false;

    init(config) {
        this.socket = new WebSocket("ws://" + config.ip + ":" + config.port);

        this.socket.onopen = (e)=> {
            this.state = true;
            const msg = {
                'tipo' : 0,
                'mensaje' : 'master'
            }
            this.socket.send(JSON.stringify(msg));
        };

        this.socket.onmessage = () => {
            let objeto = JSON.parse(event.data);
            switch(objeto.valor) {
                case "master":
                    this.master = true;
                    break;
            }
            config.check();
        };

        this.socket.onclose = () => {
            this.state = false;
        };

        this.socket.onerror = () => {
            this.state = false;
        };
    }
}

export {Comunication};