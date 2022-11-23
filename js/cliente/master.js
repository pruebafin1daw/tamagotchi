"use strict";

let socket = new WebSocket("ws://localhost:8023");
//socket.binaryType = "arraybuffer";

socket.onopen = function (e) {
  alert("[open] Conexión establecida");
  alert("Enviando al servidor");
  const msg = {
    tipo: 1,
    mensaje: "hola, me llamo pepe",
  };
  socket.send(JSON.stringify(msg));
};

socket.onmessage = function (event) {
  console.log(event);

  alert(`[message] Datos recibidos del servidor: ${event.data}`);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    alert(
      `[close] Conexión cerrada limpiamente, código=${event.code} motivo=${event.reason}`
    );
  } else {
    // ej. El proceso del servidor se detuvo o la red está caída
    // event.code es usualmente 1006 en este caso
    alert("[close] La conexión se cayó");
  }
};

socket.onerror = function (error) {
  alert(`[error] ${error.message}`);
};

const CASILLA = 0;
const MADRIGUERA = 1;
const META = 2;

// Tablero
tablero[20][20];
tablero.forEach((row, rowIndex) => {
  row.forEach((column, columnIndex) => {
    let tipo = null;
    if (
      rowIndex == Math.round(tablero.lenght / 2) &&
      columnIndex == Math.round(tablero[0].lenght / 2)
    ) {
      tipo = META;
    } else if (rowIndex == 5 && columnIndex == 8) {
      tipo = MADRIGUERA;
    } else {
      tipo = CASILLA;
    }
    let casilla = {
      tipo: tipo,
      jugadores: [],
    };
    tablero[rowIndex][columnIndex] = casilla;
  });
});
const msg = {
  tipo: 0,
  mensaje: tablero,
};
socket.send(JSON.stringify(msg));
