class Master {
  init(config, comunicacion) {
    this.comunicacion = comunicacion;
    this.comunicacion.handler = this;

    this.jugadores = [];
    this.tablero = new Array();
    this.bordes = [];
    this.tableroJugador = null;

    this.crearTablero(config);
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
      }
    }
    this.tableroJugador = {
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

  interpretarMensaje(msg, origin) {
    if (msg.valor == "conexion") {
      this.añadirJugador(msg.id, origin);
    } else {
      const mensaje = msg.valor;
      switch (mensaje.tipo) {
        case "movimiento":
          this.comprobarMovimiento(mensaje, msg.id);
          break;
      }
    }
  }

  añadirJugador(id, origin) {
    if (!this.jugadores.find((x) => x.origin === origin)) {
      let jugador = {
        origin: origin,
        nombre: "",
        posicionX: 0,
        poisicionY: 0,
        enMadriguera: true,
        salud: SALUD,
      };

      let index = Math.floor(Math.random() * this.bordes.length);
      let celda = this.bordes.splice(index, 1);
      celda.madrigueraJugador = jugador;
      jugador.posicionX = celda.posicionX;
      jugador.posicionY = celda.posicionY;
      this.jugadores.push(jugador, id);
    }

    let msg = {
      tipo: "tablero",
      jugador: jugador,
      tablero: this.tableroJugador,
    };
    this.comunicacion.enviarMensaje(MSG_PUBLICO, msg, id);
  }

  comprobarMovimiento(mensaje, id) {
    let idJugador = id;
    let movimiento = mensaje.movimiento;

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

    //let casilla = null;
    if (posicion < maximaPosicion) {
      /*casilla = this.tablero[nuevaPosicionY][nuevaPosicionX];
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
      }*/
      jugador.posicionX = nuevaPosicionX;
      jugador.posicionY = nuevaPosicionY;
      let msg = {
        tipo: "posicion",
        posicionX: nuevaPosicionX,
        posicionY: nuevaPosicionY,
      };
      this.comunicacion.enviarMensaje(MSG_PUBLICO, msg, id);
    }
  }

  /*casillaMeta(mensaje, casilla) {
    let msg = null;
    if (casilla.jugadores.lenght != 0) {

    } else {
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
  }*/
}

export { Master };
