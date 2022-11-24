import { Socket } from "./js/servidor/socket.js";
import { Master } from "./js/cliente/master.js";
import { Jugador } from "./js/cliente/jugador.js";

let control = null;

let socket = new Socket();
socket.init({
  ip: "localhost",
  port: "8023",
  check: tipoCliente,
});

function tipoCliente() {
  if (socket.master) {
    control = new Master();
  } else {
    control = new Jugador();
  }
  control.init();
}
