// * Códigos para el tipo de mensaje
const MSG_PRIVADO = 0;
const MSG_PUBLICO = 1;

class Master {
  comunicacion = null;

  init(comunicacion) {
    this.comunicacion = comunicacion;

    //this.definirTablero(20);
    this.comunicacion.enviarMensaje(MSG_PUBLICO, "hola");
  }

  /**
   * * Definir dimensiones del tablero
   */
  definirTablero(dimension) {
    this.enviarMensaje(MSG_PUBLICO, dimension);
  }

  actualizarPosiciones() {
    //let movimiento = this.socket.recibirMensajes();
    // TODO: Comprobar si el movimiento del jugador es válido
    // ? Reenviar tablero
  }
}

export { Master };
