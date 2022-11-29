import {GameMaster} from "./game.js";

let size = document.getElementById('size');
let number = document.getElementById('number');
let button = document.getElementById('button');
button.addEventListener("click", send);
function send(){
    let hide = document.getElementById('form');
    hide.style.display = "none";
    let form = {
        "size": size.value,
        "number": number.value
    }
    let game = new GameMaster();
    game.init(form);

    let socket = new WebSocket("ws://localhost:8023");

    socket.onopen = (e) => {
        alert("Conexión establecida");
        alert("Enviando al servidor");
        const msg = {
            "tipo" : 1,
            "size" : size.value,
        };
        socket.send(JSON.stringify(msg));
    };

    // socket.onmessage = function(event) {
    //     console.log(event)
        
    //     alert(`[message] Datos recibidos del servidor: ${event.data}`);
    // };







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
}
