// * Códigos para el tipo de mensaje
const MSG_PRIVADO = 0;
const MSG_PUBLICO = 1;

// * Códigos para el tipo de casilla
const CASILLA = 0;
const MADRIGUERA = 1;
const META = 2;

// * Id del jugador
const IDJUGADOR = 100; // TODO: Establecer id del jugador

class Jugador {
  comunicacion = null;

  init(comunicacion) {
    // * Obtenemos el socket
    this.comunicacion = comunicacion;

    // * Enviamos al servidor nuestra ID para que nos añada a la partida
    this.comunicacion.enviarMensaje(MSG_PRIVADO, `${this.IDJUGADOR}:conexion`);

    // * Invocamos la interpretación de mensajes
    this.interpretarMensaje();
  }

  /**
   * * Método que interpreta los mensajes del servidor
   */
  interpretarMensaje() {
    if (this.socket.recibirMensajes().includes(this.IDJUGADOR)) {
      const mensaje = this.socket.recibirMensajes().split(":");
      switch (mensaje[1]) {
        case "tablero":
          this.dibujarTablero(mensaje);
          break;
        case "posicion":
          this.actualizarPosicion(mensaje);
          break;
        case "enemigo":
          this.activarModoBatalla(mensaje);
          break;
      }
    } else if (this.socket.recibirMensajes().includes("finPartida")) {
      this.partidaFinalizada(mensaje);
    }
  }

  /**
   * * Método que dibuja el tablero de juego de la partida
   *
   * @param {Array} mensaje Array con el contenido del mensaje recibido del servidor
   */
  dibujarTablero(mensaje) {
    let dimensiones = mensaje[2];
    let posicionY = mensaje[4];
    let posicionX = mensaje[3];
    let salud = mensaje[5];

    // TODO: Dibujamos el tablero
  }

  /**
   * * Método que envía los movimientos del jugador al servidor
   */
  movimientos() {
    document.addEventListener("keydown", (event) => {
      let movimiento = null;
      switch (event.key) {
        case "w":
          movimiento = "arriba";
          break;
        case "a":
          movimiento = "izquierda";
          break;
        case "d":
          movimiento = "abajo";
          break;
        case "s":
          movimiento = "derecha";
          break;
      }
      this.comunicacion.enviarMensaje(
        MSG_PRIVADO,
        `${this.IDJUGADOR}:movimiento:${movimiento}`
      );
    });
  }

  /**
   * * Método que actualiza la posición del jugador
   *
   * @param {Array} mensaje Array con el contenido del mensaje recibido del servidor
   */
  actualizarPosicion(mensaje) {
    let posicionY = mensaje[3];
    let posicionX = mensaje[2];

    // TODO: Actualizamos las posiciones del jugador
  }

  /**
   * * Método que activa el modo batalla cuando encontramos a otro jugador
   *
   * @param {Array} mensaje Array con el contenido del mensaje recibido del servidor
   */
  activarModoBatalla(mensaje) {
    // TODO: Activamos el modo batalla
  }

  /**
   * * Método que finaliza la partida con el resultado requerido
   *
   * @param {Array} mensaje Array con el contenido del mensaje recibido del servidor
   */
  partidaFinalizada(mensaje) {
    // TODO: Finalizamos la partida con el resultado requerido
    if (mensaje[0] == IDJUGADOR) {
      console.log("HAS GANADO");
    } else {
      console.log("HAS PERDIDO");
    }
  }
}

export { Jugador };
