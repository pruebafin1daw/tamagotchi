class Comunicacion {
  socket = null;
  state = false;
  master = false;
  handler = null;

  init(config) {
    this.socket = new WebSocket(`ws://${config.ip}:${config.port}`);

    this.socket.onopen = (event) => {
      this.state = true;
    };

    this.socket.onmessage = (event) => {
      let objeto = JSON.parse(event.data);
      switch (objeto.valor) {
        case "master":
          this.master = true;
          config.check();
          break;
        case "jugador":
          config.check(objeto.id);
          break;
        default:
          if (this.handler) {
            this.handler.nuevoMensaje(objeto, event.origin);
          }
      }
    };

    this.socket.onclose = (event) => {
      this.state = false;
    };

    this.socket.onerror = (error) => {
      this.state = false;
    };
  }

  static get MSG_PRIVADO() {
    return 0;
  }

  static get MSG_PUBLICO() {
    return 1;
  }

  set handler(newHandler) {
    this._handler = newHandler;
  }

  get handler() {
    return this._handler;
  }

  enviarMensaje(tipoMsg, msg) {
    this.socket.send(
      JSON.stringify({
        tipo: tipoMsg,
        mensaje: msg,
      })
    );
  }
}

export { Comunicacion };
