class Master {
  comunicacion = null;

  jugadores = [];
  tablero = new Array();
  bordes = [];

  init(config, comunicacion) {
    this.comunicacion = comunicacion;
    this.comunicacion.handler = this;

    this.crearTablero(config);
    this.interpretarMensaje();
  }

  crearTablero(config) {
    for (let i = 0; i < config.alto; i++) {
      this.tablero[i] = new Array();
      for (let j = 0; j < config.ancho; j++) {
        this.tablero[i][j] = {
          y: i,
          x: j,
          meta: false,
          jugadores: [],
          madriguera: false,
          madrigueraJugador: null,
        };
        if (i == 0 || i == config.alto - 1 || j == 0 || j == config.ancho - 1) {
          if ((i + j) % 2) {
            this.tablero[i][j].madriguera = true;
            this.bordes.push(this.tablero[i][j]);
          }
        } else if (Math.random() < config.porcentaje) {
          this.tablero[i][j].madriguera = true;
        }

        /*let tipoCasilla = null;
        if (i % 2 == 1 && j % 2 == 1) {
          tipoCasilla = MADRIGUERA;
        } else if (
          i == Math.floor(DIMENSIONES / 2) - 1 &&
          j == Math.floor(DIMENSIONES / 2) - 1
        ) {
          tipoCasilla = META;
        } else {
          tipoCasilla = CASILLA;
        }
        casilla = {
          tipo: tipoCasilla,
          jugadores: [],
        };
        this.tablero[i][j] = casilla;*/
      }
    }
    let tableroJugador = {
      ancho: config.ancho,
      alto: config.alto,
      madriguera: this.tablero
        .flatMap((casilla) => casilla)
        .filter((casilla) => casilla.madriguera)
        .map((casilla) => {
          return {
            y: casilla.y,
            x: casilla.x,
          };
        }),
    };
  }

  interpretarMensaje() {
    if (this.socket.recibirMensajes() != undefined) {
      const mensaje = this.socket.recibirMensajes().split(":");
      switch (mensaje[1]) {
        case "conexion":
          this.añadirJugador(origeny);
          break;
        case "movimiento":
          this.comprobarMovimiento(mensaje);
          break;
      }
    }
  }

  añadirJugador(mensaje) {
    let idJugador = mensaje[0];

    let posicionX = null;
    let posicionY = null;
    do {
      posicionX = Math.floor(Math.random() * DIMENSIONES) + 1;
      posicionY = Math.floor(Math.random() * DIMENSIONES) + 1;
    } while (
      this.tablero[posicionY][posicionX].tipo != CASILLA &&
      this.tablero[posicionY][posicionX].jugador.lenght != 0
    );

    if (!this.jugadores.find((x) => x.origen === origen)) {
      let jugador = {
        origen: origen,
        nombre: "",
        posicionX: posicionX,
        poisicionY: posicionY,
        enMadriguera: true,
        salud: SALUD,
      };

      let index = Math.floor(Math.random() * this.bordes.length);
      let celda = this.bordes.splice(index, 1);
      celda.madrigueraJugador = jugador;
      jugador.x = celda.x;
      jugador.y = celda.y;
      this.jugadores.push(jugador);
    }
    /*this.tablero[posicionY][posicionX].jugador.push(jugador);
    this.jugadores.push(jugador);*/

    // TODO: Enviar posicion
    /*let msg = `${idJugador}:tablero:${DIMENSIONES}:${posicionX}:${posicionY}:${SALUD}`;
    this.comunicacion.enviarMensaje(MSG_PUBLICO, msg);*/
  }

  comprobarMovimiento(mensaje) {
    let idJugador = mensaje[0];
    let movimiento = mensaje[2];

    let jugador = this.jugadores.find(({ id }) => id === idJugador);
    let posicionX = jugador.posicionX;
    let posicionY = jugador.posicionY;

    let posicion, maximaPosicion, nuevaPosicionX, nuevaPosicionY;

    switch (movimiento) {
      case 0: {
        posicion = 0;
        maximaPosicion = posicionX;
        nuevaPosicionX = posicionX - 1;
        nuevaPosicionY = posicionY;
        break;
      }
      case 1: {
        posicion = 0;
        maximaPosicion = posicionY;
        nuevaPosicionX = posicionX;
        nuevaPosicionY = posicionY - 1;
        break;
      }
      case 2: {
        posicion = posicionY;
        maximaPosicion = this.tablero[0].length;
        nuevaPosicionX = posicionX;
        nuevaPosicionY = posicionY + 1;
        break;
      }
      case 3: {
        posicion = posicionX;
        maximaPosicion = this.tablero.length - 1;
        nuevaPosicionX = posicionX + 1;
        nuevaPosicionY = posicionY;
        break;
      }
    }

    let casilla = null;
    if (posicion < maximaPosicion) {
      casilla = this.tablero[nuevaPosicionY][nuevaPosicionX];
      switch (casilla.tipo) {
        case META:
          this.casillaMeta(mensaje, casilla);
          break;
        case MADRIGUERA:
          this.casillaMadriguera(mensaje, casilla);
          break;
        case CASILLA:
          this.casillaNormal(mensaje, casilla);
          break;
      }
    }
  }

  casillaMeta(mensaje, casilla) {
    let msg = null;
    if (casilla.jugadores.lenght != 0) {
      // TODO Ya hay un jugador en la meta
    } else {
      // TODO Implementar victoria
      msg = `${idJugador}:finPartida:${posicionX}:${posicionY}`;
    }
    this.comunicacion.enviarMensaje(MSG_PUBLICO, msg);
  }

  casillaMadriguera(mensaje, casilla) {
    let msg = null;
    this.comunicacion.enviarMensaje(MSG_PUBLICO, msg);
  }

  casillaNormal(mensaje, casilla) {
    let msg = null;
    msg = `${idJugador}:posicion:${posicionX}:${posicionY}`;
    this.comunicacion.enviarMensaje(MSG_PUBLICO, msg);
  }
}

export { Master };
