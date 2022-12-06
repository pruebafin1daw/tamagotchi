class Communication {
    socket = null;
    state = false;
    master = false;
    handler = null;

    init(config) {

        this.socket = new WebSocket(`ws://${config.ip}:${config.port}`);

        this.socket.onopen = (e) => {
            this.state = true;
        };

        this.socket.onmessage = (event) => {
            let objeto = JSON.parse(event.data);

            switch(objeto.valor) {
                case 'master':
                    this.master = true;
                    config.check(); 
                break;

                case 'Has sido conectado':
                    config.check(objeto.id);
                break;

                default:
                    if(this.handler) {
                        this.handler.newMsg(objeto, event.origin);
                    }
            }
        };

        this.socket.onclose = (event) => {
            this.state = false;
        };

        this.socket.onerror = (error) => {
            this.state = false;
        };
    }

    static get MASTER () {
        return 0;
    }

    static get ALL () {
        return 1;
    }

    set handler(newHandler) {
        this._handler = newHandler;
    }

    get handler () {
        return this._handler;
    }

    send(data, type, id) {
        const msg = {
            tipo: type,
            mensaje: data,
        }
        if(id != null) {
            msg.id = id;
        }
        
        this.socket.send(JSON.stringify(msg));
    }
}

export { Communication };