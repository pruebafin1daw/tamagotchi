class Communication {
    socket = null;
    state = false;
    master = false;
    id = null;
    handler = null;
    init(config) {
        this.socket = new WebSocket("ws://" + config.ip + ":" + config.port);
        this.socket.onopen = (e)=> {
            this.state = true;
        };
        this.socket.onmessage = (event)=> {
            let data = JSON.parse(event.data);
            switch(data.valor) {
                case "master":
                    this.master = true;
                    config.check();
                    break;
                case "newClient":
                    this.id = data.id;
                    config.check();
                    break;
                default:
                    if (this.handler) {
                        this.handler.newMsg(data, event.origin);
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

    send(type, content) {
        const msg = {
            type: type,
            content: content
        }           
        this.socket.send(JSON.stringify(msg));
    }
} 

export {Communication};