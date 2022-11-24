class Comunicacion {
  socket = null;
  state = false;
  master = false;

  init(config) {
    this.socket = new WebSocket(`ws://${config.ip}:${config.port}`);

    this.socket.onopen = (event) => {
      this.state = true;
      this.enviarMensaje(0, "master");
    };

    this.socket.onmessage = (event) => {
      let objeto = JSON.parse(event.data);
      if (!this.master) {
        switch (objeto.valor) {
          case "master":
            this.master = true;
            break;
        }
        config.check();
        console.log(objeto.valor);
      }
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
}

export { Comunicacion };
