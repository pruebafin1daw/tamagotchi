import {Player} from "./player.js";
import {Board} from "./boardHandler.js";
import * as events from "./playerEvents.js"
class Communication {
    MASTER = 0;
    CLIENTS = 1;
    
    board = null;
    clientId = null;
    clientPlayer = null;

    socket = null;
    state = false;
    init(config) {
        this.socket = new WebSocket("ws://" + config.ip + ":" + config.port);
        this.socket.onopen = (e)=> {
            this.state = true;
        };
        this.socket.onmessage = (event) => {
            let data = JSON.parse(event.data);
            if(typeof data.valor != 'object'){
                return;
            }
            switch(data.valor.type){
                case "master":
                    Board.masterError();
                    this.send({
                        mensaje : "error"
                    }, -1)
                    this.socket.close();
                    break;
                case "identity":
                    let nickname = prompt("Please enter your nickname");
                    this.clientId = data.valor.id;
                    this.send({
                        type : "newPlayer",
                        nickname : nickname,
                        id : this.clientId,
                    }, this.MASTER);
                    break;
                case "draw":
                    if(!this.board) break;
                    this.board.drawBoard(data.valor.board);
                    break;
                case "player":
                    if(this.clientPlayer != null) break;
                    this.clientPlayer = new Player(data.valor.player);
                    this.board = new Board();
                    this.board.init({
                        communication : this
                    });
                    events.setEvents(this, this.clientPlayer);
                    break;
                case "playerMovement":
                    this.board.movePlayer(data.valor.posX, data.valor.posY)
                    break;
            }
        }
        this.socket.onclose = (event)=> {
            this.state = false;
        };
        this.socket.onerror = (error)=> {
            this.state = false;
        };
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