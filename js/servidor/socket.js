"use strict";

class Socket {
  socket = new WebSocket("ws://localhost:8023");

  conectarse() {
    this.socket.onopen = function (e) {
      alert("[open] Conexión establecida");
    };
  }

  enviarMensaje(msg) {
    this.socket.send(JSON.stringify(msg));
  }

  recibirMensajes() {
    this.socket.onmessage = function (event) {
      console.log(event);
      alert(`[message] Datos recibidos del servidor: ${event.data}`);
    };
  }

  desconectarse() {
    this.socket.onclose = function (event) {
      if (event.wasClean) {
        alert(
          `[close] Conexión cerrada limpiamente, código=${event.code} motivo=${event.reason}`
        );
      } else {
        alert("[close] La conexión se cayó");
      }
    };
  }

  errores() {
    this.socket.onerror = function (error) {
      alert(`[error] ${error.message}`);
    };
  }
}

export { Socket };
