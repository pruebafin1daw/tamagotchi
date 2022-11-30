// Import the ws module as a variable called WebSocketServer.
var WebSocketServer = require("ws").Server;

// Create a new WebSocketServer running on port 7007.
var wss = new WebSocketServer({ port: 8023 });
var clientMaster = null;
var first = true;
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
    switch (data.tipo) {
      case 0:
        clientMaster.send(JSON.stringify(message));
        break;
      case 1:
        wss.clients.forEach(function each(client) {
          client.send(JSON.stringify(message));
        });
        break;
    }
  }
};

// Create a listener function for the "connection" event.
// Each time we get a connection, the following function
// is called.
wss.on("connection", function connection(ws) {
  ws.on("message", wss.broadcast);
  if (first) {
    clientMaster = ws;
    first = false;
    const message = {
      type: "mensaje",
      valor: "master",
    };
    clientMaster.send(JSON.stringify(message));
  } else {
    const message = {
      type: "mensaje",
      valor: "jugador",
    };
    ws.send(JSON.stringify(message));
  }
  console.log(client);
});
