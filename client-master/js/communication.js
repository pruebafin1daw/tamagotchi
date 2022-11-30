import {Board} from "./boardHandler.js";
class Communication {
    MASTER = 0;
    CLIENTS = 1;
    board = null;
    socket = null;
    state = false;
    clients = [];
    init(config) {
        this.socket = new WebSocket("ws://" + config.ip + ":" + config.port);
        this.socket.onopen = (e)=> {
            this.state = true;
            this.board = new Board();
            this.board.init({
                width: 14,
                height: 14,
                communication : this,
            });
        };

        this.socket.onclose = (event)=> {
            this.state = false;
        };
        this.socket.onerror = (error)=> {
            this.state = false;
        };
    }

    activateMessages(){
        this.socket.onmessage = (event) => {
            let data = JSON.parse(event.data);
            if(typeof data.valor == 'object'){
                switch(data.valor.type){
                    case "newPlayer":
                        console.log(data);
                        let player = this.board.addPlayer(data.valor.nickname, data.valor.id);
                        this.clients.push({
                            id : data.valor.ids,
                            player : player
                        });
                        break;
                    case "move":
                        this.board.movePlayer(data.valor)
                        break;
                }
            }
        }
    }

    send(data, type) {
        const msg = {
            tipo: type,
            mensaje: data
        }           
        this.socket.send(JSON.stringify(msg));
    }

    sendId(data, id) {
        const msg = {
            id: id,
            mensaje: data
        }           
        this.socket.send(JSON.stringify(msg));
    }
} 

export {Communication};