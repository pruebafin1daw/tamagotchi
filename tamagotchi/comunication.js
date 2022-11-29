class Comunication {
    socket = null;
    state = false;
    master = false;
    init(config) {
        this.socket = new WebSocket("ws://" + config.ip + ":" + config.port);
        this.socket.onopen = (e)=> {
            this.state = true;
            const msg = {
                "tipo" : 0,
                "mensaje" : "master"
            }
            this.socket.send(JSON.stringify(msg));
        };
        this.socket.onmessage = (event)=> {
            console.log(event);
            console.log(`[message] Datos recibidos del servidor: ${event.data}`);
            let objeto = JSON.parse(event.data);
            switch(objeto.valor) {
                case "master":
                    this.master = true;
                break;
                case "client":
                    this.master = false;
                break;
            }
            config.check();
        };
        this.socket.onclose = (event)=> {
            this.state = false;
        };
        this.socket.onerror = (error)=> {
            this.state = false;
        };
    }
}

export {Comunication};

/*Problemas:

Al meterte con un nuevo cliente no llega al new Client() de
inicio.js

Al entrar manda el mensaje de on.open al master*/



