const CASILLA = 0;
const MADRIGUERA = 1;
const META = 2;
const JUGADOR = 3;

class Jugador {
  init(comunicacion, id) {
    this.comunicacion = comunicacion;
    this.id = id;
    this.comunicacion.enviarMensaje(comunicacion.MSG_PRIVADO, "conexion", id);

    this.jugador = null;
    this.tablero = null;
    this.activo = false;
    this.movimientos();
  }

  interpretarMensaje(msg, origin) {
    const mensaje = msg.valor;
    switch (mensaje.tipo) {
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
  }

  dibujarTablero(mensaje) {
    this.tablero = [mensaje.tablero.alto][mensaje.tablero.ancho];
    this.jugador = mensaje.jugador;

    let table = document.createElement("table");
    for (let i = 0; i < this.tablero.lenght; i++) {
      let tr = document.createElement("tr");
      for (let j = 0; j < this.tablero[i].lenght; j++) {
        let th = document.createElement("th");
        tr.appendChild(th);
        let casilla = null;
        if (
          mensaje.tablero.madriguera.find(
            (madriguera) => madriguera.y === i && madriguera.x === j
          )
        ) {
          casilla = MADRIGUERA;
        } else if (
          i == this.tablero.lenght - 1 / 2 &&
          j == this.tablero[0].lenght - 1 / 2
        ) {
          casilla = META;
        } else if (this.jugador.posicionY == i && this.jugador.posicionX == j) {
          casilla = JUGADOR;
        } else {
          casilla = CASILLA;
        }
        tr.cells[j].appendChild(document.createTextNode(casilla));
        table.appendChild(tr);
      }
    }
    document.body.appendChild(table);
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

      let msg = {
        tipo: "movimiento",
        movimiento: movimiento,
      };
      this.comunicacion.enviarMensaje(MSG_PRIVADO, msg, this.id);
    });
  }

  actualizarPosicion(mensaje) {}

  activarModoBatalla(mensaje) {}

  partidaFinalizada(mensaje) {}
}

export { Jugador };
