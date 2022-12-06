class Communication {
    
    socket = null;
    state = false;
    master = false;
    id = null;
    handler = null;
    init(config) {
        this.socket = new WebSocket("ws://" + config.ip + ":" + config.port);
        this.socket.onopen = ()=> {
            this.state = true;
        };
        this.socket.onmessage = (event)=> {
            let data = JSON.parse(event);
            switch(data.funct) {
                case "master":
                    this.master = true;
                    config.check();
                    break;
                case "newClient":
                    this.id = data.id;
                    config.check();
                    break;
                default:
                    this.handler.newMsg(data);
                    break;
            }
        };
        this.socket.onclose = ()=> {
            this.state = false;
        };
        this.socket.onerror = ()=> {
            this.state = false;
        };
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