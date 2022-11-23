"use strict";

import { FormUI } from "./formApi/FormUI";
import { Tamagotchi } from "./js/tamagotchi";

let socket = new WebSocket("ws://127.0.0.1:8023");

let game = new Tamagotchi();
initGame({
  map: {
    x: 20,
    y: 20
  },
});

function initGame(config) {
  game.init(config);
}

socket.onopen = function(e) {
  const msg = {
    "tipo": 1,
	  "mensaje" : "hola",
  }
  socket.send(JSON.stringify(msg));
};

socket.onmessage = function(event) {
  console.log(event)
  alert(`[message] Datos recibidos del servidor: ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    alert(`[close] Conexión cerrada limpiamente, código=${event.code} motivo=${event.reason}`);
  } else {
    alert('[close] La conexión se cayó');
  }
};

socket.onerror = function(error) {
  alert(`[error] ${error.message}`);
};