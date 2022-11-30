import { Comunicacion } from "./js/servidor/comunicacion.js";
import { Master } from "./js/cliente/master.js";
import { Jugador } from "./js/cliente/jugador.js";

let control = null;

let comunicacion = new Comunicacion();
comunicacion.init({
  ip: "localhost",
  port: "8023",
  check: tipoCliente,
});

function tipoCliente() {
  if (comunicacion.master) {
    console.log("Soy el master");
    control = new Master();
    control.init(
      {
        ancho: 51,
        alto: 51,
        porcentaje: 0.2,
      },
      comunicacion
    );
  } else {
    console.log("Soy un jugador");
    control = new Jugador();
    control.init(comunicacion);
  }
}
