import { v4 as uuidv4, v6 as uuidv6 } from "uuid";

// Import the ws module as a variable called WebSocketServer.
var WebSocketServer = require("ws").Server;

// Create a new WebSocketServer running on port 7007.
var wss = new WebSocketServer({ port: 8023 });
var clientMaster = null;
var first = true;
var clientes = [];
// Output a log to say the server is running.
console.log("Server is Running...");

// Create a "broadcast" function on our WebSocketServer object.
// The function will take a "msg" paramter. When called, it will
// loop through all the connected clients and send them the msg.
wss.broadcast = function broadcastMsg(msg) {
  let data = JSON.parse(msg);
  const message = {
    type: "mensaje",
    valor: JSON.parse(msg).mensaje,
  };
  console.log("Desde mensajes: " + data.tipo);
  if (data.tipo != null) {
    if (data.tipo == 0) {
      clientMaster.send(JSON.stringify(message));
    } else if (data.id) {
      let cliente = clientes.find((item) => item.id == data.id);
      if (cliente) {
        cliente.socket.send(JSON.stringify(message));
      }
    } else {
      wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(message));
      });
    }
  }
};

// Create a listener function for the "connection" event.
// Each time we get a connection, the following function
// is called.
<<<<<<< HEAD
wss.on("connection", function connection(ws, request, client) {
=======
wss.on("connection", function connection(ws) {
  ws.on("message", wss.broadcast);
>>>>>>> 5a8acce2ef7c82237692e36507fecce11a26f95f
  if (first) {
    clientMaster = ws;
    first = false;
    const message = {
      type: "mensaje",
      valor: "master",
    };
    clientMaster.send(JSON.stringify(message));
  } else {
<<<<<<< HEAD
    let id = uuidv4();
    clientes.push({
      id: id,
      socket: request.socket,
    });
    const message = {
      type: "mensaje",
      valor: "jugador",
      id: id,
=======
    const message = {
      type: "mensaje",
      valor: "jugador",
>>>>>>> 5a8acce2ef7c82237692e36507fecce11a26f95f
    };
    ws.send(JSON.stringify(message));
  }
  console.log(client);
});
