"use strict";

let socket = new WebSocket("ws://localhost:8023");
//socket.binaryType = "arraybuffer";

let messageText = document.getElementById("message");

socket.onopen = function(e) {
    alert("[open] Conexión establecida");
    alert("Enviando al servidor");
    /*const msg = {
        "tipo" : 1,
        "mensaje" : "Hello World",
    }
    socket.send(JSON.stringify(msg));*/
    socket.send("Hello Server");
};

socket.onmessage = function(event) {
    console.log(event);

    alert(`[message] Datos recibidos del servidor: ${event.data}`);

    let text = event.data;

    messageText.innerHTML = text;
};

socket.onclose = function(event) {
    if (event.wasClean) {
        alert(`[close] Conexión cerrada limpiamente, código=${event.code} motivo=${event.reason}`);
    } else {
        // ej. El proceso del servidor se detuvo o la red está caída
        // event.code es usualmente 1006 en este caso
        alert('[close] La conexión se cayó');
    }
};

socket.onerror = function(error) {
    alert(`[error] ${error.message}`);
};