import { Master } from "./master.js";
import { Client } from "./client.js";

class Comunication {
    socket = null;
    state = false;
    first = true;
    master;
    init(config) {
        this.socket = new WebSocket("ws://" + config.ip + ":" + config.port);

        this.socket.onopen = (e) => {
            this.state = true;
            this.sendMessage();
        }

        this.socket.onmessage = (event) => {
            this.master = false;
            console.log(event);
            console.log(`[message] Datos recibidos del servidor: ${JSON.parse(event.data).value}`);
            // switch (objeto.valor) {
            //     case "master":
            //         this.master = true;
            //         break;
            // }
            // config.check();
        };

        this.socket.onclose = (event) => {
            this.state = false;
        };

        this.socket.onerror = (error) => {
            this.state = false;
        };
    }

    sendMessage() {
        let type = 1;
        let user = new Client();
        console.log('entramos');
        if (this.first) {
            this.first = false;
            user = new Master();
            type = 0;
        }

        const msg = {
            "type": type,
            "message": user.init()
        }

        console.log(msg);
        
        this.socket.send(JSON.stringify(msg));
    }
}

export { Comunication };