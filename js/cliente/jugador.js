// * Códigos para el tipo de mensaje
const MSG_PRIVADO = 0;
const MSG_PUBLICO = 1;

// * Códigos para el tipo de casilla
const CASILLA = 0;
const MADRIGUERA = 1;
const META = 2;

class Jugador {
  comunicacion = null;

  init(comunicacion) {
    this.comunicacion = comunicacion;

    // TODO: Añadir jugador a lista de jugadores
    //this.dibujarTablero();
    //this.movimientos();
  }

  dibujarTablero() {
    //let dimensiones = this.socket.recibirMensajes();
    let dimensiones = 4;
    const tablero = [];
    for (let i = 0; i < dimensiones; i++) {
      for (let j = 0; i < dimensiones; j++) {
        let tipo = null;
        if (
          i == Math.round(dimensiones / 2) &&
          j == Math.round(dimensiones / 2)
        ) {
          tipo = META;
        } else if (i == 5 && j == 8) {
          tipo = MADRIGUERA;
        } else {
          tipo = CASILLA;
        }
        let casilla = {
          tipo: tipo,
          jugadores: [],
        };
        tablero.push(casilla);
      }
    }
  }

  /**
   * * Movimientos del jugador
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
      const msg = {
        tipo: MSG_PRIVADO,
        mensaje: movimiento,
      };
      //this.socket.enviarMensaje(msg);
    });
  }
}

export { Jugador };
