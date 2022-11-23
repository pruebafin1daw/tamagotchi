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

// Movimientos
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
  const msg = {
    tipo: 0,
    mensaje: movimiento,
  };
});
