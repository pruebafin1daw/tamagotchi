class Socket {
  socket = null;
  state = false;
  master = false;

  init(config) {
    this.socket = new WebSocket(`ws://${config.ip}:${config.port}`);

    this.socket.onopen = (event) => {
      this.state = true;
      const msg = {
        tipo: 0,
        mensaje: "master",
      };
      this.socket.send(JSON.stringify(msg));
    };

    this.socket.onmessage = (event) => {
      console.log(event);
      alert(`[message] Datos recibidos del servidor: ${event.data}`);
    };

    this.socket.onclose = (event) => {
      this.state = false;
    };

    this.socket.onerror = (error) => {
      this.state = false;
    };
  }
}

export { Socket };
