const MSG_PRIVADO = 0;
const MSG_PUBLICO = 1;

const CASILLA = 0;
const MADRIGUERA = 1;
const META = 2;

const IDJUGADOR = 100; // TODO: Establecer id del jugador

class Jugador {
  comunicacion = null;

  init(comunicacion, id) {
    this.comunicacion = comunicacion;

    this.id = id;
    this.comunicacion.enviarMensaje(MSG_PRIVADO, `${this.IDJUGADOR}:conexion`);

    this.interpretarMensaje();
  }

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

  dibujarTablero(mensaje) {
    let dimensiones = mensaje[2];
    let posicionY = mensaje[4];
    let posicionX = mensaje[3];
    let salud = mensaje[5];

    // TODO: Dibujamos el tablero
  }

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

  actualizarPosicion(mensaje) {
    let posicionY = mensaje[3];
    let posicionX = mensaje[2];

    // TODO: Actualizamos las posiciones del jugador
  }

  activarModoBatalla(mensaje) {
    // TODO: Activamos el modo batalla
  }

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
