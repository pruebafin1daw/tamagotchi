class Comunicacion {
  socket = null;
  state = false;
  master = false;

  init(config) {
    this.socket = new WebSocket(`ws://${config.ip}:${config.port}`);

    this.socket.onopen = (event) => {
      this.state = true;
    };

    this.socket.onmessage = (event) => {
      let objeto = JSON.parse(event.data);
      if (objeto.valor == "master") {
        this.master = true;
      }
      config.check();
    };

    this.socket.onclose = (event) => {
      this.state = false;
    };

    this.socket.onerror = (error) => {
      this.state = false;
    };
  }

  enviarMensaje(tipoMsg, msg) {
    this.socket.send(
      JSON.stringify({
        tipo: tipoMsg,
        mensaje: msg,
      })
    );
  }

  recibirMensajes() {
    this.socket.onmessage = (event) => {
      return JSON.parse(event.data).valor;
    };
  }
}

export { Comunicacion };
