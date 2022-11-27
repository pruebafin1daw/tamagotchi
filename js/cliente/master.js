// * Códigos para el tipo de mensaje
const MSG_PRIVADO = 0;
const MSG_PUBLICO = 1;

// * Dimensiones del tablero
const DIMENSIONES = 50;

class Master {
  comunicacion = null;

  // * Array con los jugadores de la partida
  jugadores = [];

  init(comunicacion) {
    // * Obtenemos el socket
    this.comunicacion = comunicacion;

    // * Invocamos la interpretación de mensajes
    this.interpretarMensaje();
  }

  /**
   * * Método que interpreta los mensajes de los jugadores
   */
  interpretarMensaje() {
    const mensaje = this.socket.recibirMensajes().split(":");
    switch (mensaje[1]) {
      case "conexion":
        this.añadirJugador(mensaje);
        break;
      case "movimiento":
        this.comprobarMovimiento(mensaje);
        break;
    }
  }

  /**
   * * Método que añade al jugador a la partida y le envía las dimensiones del
   * * tablero de juego junto a su posición en él
   *
   * @param {Array} mensaje Array con el contenido del mensaje recibido del jugador
   */
  añadirJugador(mensaje) {
    let idJugador = mensaje[0];

    // TODO: Asignar posiciones
    let posicionX = 0;
    let posicionY = 0;

    let jugador = {
      id: idJugador,
      posicionX: posicionX,
      poisicionY: posicionY,
    };
    this.jugadores.push(jugador);

    let msg = `${idJugador}:tablero:${DIMENSIONES}:${posicionX}:${posicionY}`;
    this.comunicacion.enviarMensaje(MSG_PUBLICO, msg);
  }

  /**
   * * Método que comprueba el movimiento del jugador y le envía el resultado de este
   *
   * @param {Array} mensaje Array con el contenido del mensaje recibido del jugador
   */
  comprobarMovimiento(mensaje) {
    let msg = null;
    let idJugador = mensaje[0];
    let movimiento = mensaje[2];

    let jugador = this.jugadores.find(({ id }) => id === idJugador);
    let posicionX = jugador.posicionX;
    let posicionY = jugador.posicionY;

    // TODO: Comprobar el movimiento del jugador
    if (meta) {
    } else if (jugador) {
    } else if (madriguera) {
    } else {
      msg = `${idJugador}:posicion:${posicionX}:${posicionY}`;
    }
    this.comunicacion.enviarMensaje(MSG_PUBLICO, msg);
  }
}

export { Master };
