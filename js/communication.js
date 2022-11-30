class Communication {
    socket = null;
    state = false;
    master = false;
    handler = null;
    init(config) {
        this.socket = new WebSocket("ws://" + config.ip + ":" + config.port);
        this.socket.onopen = (e)=> {
            this.state = true;
        };
        this.socket.onmessage = (event)=> {
            let objeto = JSON.parse(event.data);
            switch(objeto.valor) {
                case "master":
                    this.master = true;
                    config.check(); //#2
                    break;
                case "hello":
                    config.check();
                    console.log('eeee')
                    break;
                default:
                    if (this.handler) {
                        console.log(objeto)
                        console.log(objeto.valor)
                        console.log(objeto.id)
                        this.handler.newMsg(objeto,objeto.id);
                    }
                    
            }
        };
        this.socket.onclose = (event)=> {
            this.state = false;
        };
        this.socket.onerror = (error)=> {
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

    send(data,type) {
        const msg = {
            tipo: type,
            mensaje: data
        }           
        this.socket.send(JSON.stringify(msg));
    }
    sendid(data, origin) {
        const msg = {
            tipo: data.type,
            mensaje: data.valor,
            id : origin
        }           
        this.socket.send(JSON.stringify(msg));
    }
} 

export {Communication};