import { Socket } from "../servidor/socket.js";

// * Códigos para el tipo de mensaje
const MSG_PRIVADO = 0;
const MSG_PUBLICO = 1;

class Master {
  socket = new Socket();

  init() {
    this.socket.conectarse();
    this.definirTablero(20);
  }

  /**
   * * Definir dimensiones del tablero
   */
  definirTablero(dimension) {
    const msg = {
      tipo: MSG_PUBLICO,
      mensaje: dimension,
    };
    this.socket.enviarMensaje(msg);
  }

  actualizarPosiciones() {
    let movimiento = this.socket.recibirMensajes();
    // TODO: Comprobar si el movimiento del jugador es válido

    // ? Reenviar tablero
  }
}

export { Master };
