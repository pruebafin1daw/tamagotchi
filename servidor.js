import { v4 as uuidv4, v6 as uuidv6 } from "uuid";

var WebSocketServer = require("ws").Server;

var wss = new WebSocketServer({ port: 8023 });
var clientMaster = null;
var first = true;
var clientes = [];

console.log("Server is Running...");

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

wss.on("connection", function connection(ws, request, client) {
  if (first) {
    clientMaster = ws;
    first = false;
    const message = {
      type: "mensaje",
      valor: "master",
    };
    clientMaster.send(JSON.stringify(message));
  } else {
    let id = uuidv4();
    clientes.push({
      id: id,
      socket: request.socket,
    });
    const message = {
      type: "mensaje",
      valor: "jugador",
      id: id,
    };
    ws.send(JSON.stringify(message));
  }
  console.log(client);
});
