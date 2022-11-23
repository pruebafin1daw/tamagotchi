import {Player} from "./player.js"
import * as board from "./boardHandler.js";
import * as events from "./playerEvents.js"

let socket = new WebSocket("ws://localhost:8023");
let clientPlayer = null;

socket.onopen = function(e) {
  let nickname = prompt("Please enter your nickname");
  const msg = {
  	"tipo" : 0,
    "mensaje":{
      "type" : "newPlayer",
      "nickname" : nickname,
    }
  }
  socket.send(JSON.stringify(msg));
};

socket.onclose = function(event) {
  
};

socket.onmessage = (event) => {
  let data = JSON.parse(event.data);

  if(typeof data.valor == 'object'){
    switch(data.valor.type){
        case "draw":
            board.drawBoard(data.valor.board);
            break;
        case "player":
            clientPlayer = new Player(data.valor.player);
            board.init({
              socket: socket,
              clientPlayer: clientPlayer
            });
            events.init(clientPlayer, socket);
            break;
        case "playerMovement":
            board.movePlayer(data.valor.posX, data.valor.posY)
            break;
    }
  }
}
