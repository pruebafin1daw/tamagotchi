// Import the ws module as a variable called WebSocketServer.
var WebSocketServer = require("ws").Server;

// Create a new WebSocketServer running on port 8023.
var wss = new WebSocketServer({ port: 8023 });
var clientMaster = null;
var client;
var first = true;
// Output a log to say the server is running.
console.log("Server is Running...");

// Create a "broadcast" function on our WebSocketServer object.
// The function will take a "msg" paramter. When called, it will
// loop through all the connected clients and send them the msg.
wss.broadcast = function broadcastMsg(msg) {
    let data = JSON.parse(msg);
    const message = {
        type: 'message',
        value: "value"
    }
    console.log("Desde mensajes: " + data.type);
    if (data.type != null) {
        if (data.type == 0) {
            clientMaster.send(JSON.stringify(message));
        } else {
            wss.clients.forEach(function each(client) {
                client.send(JSON.stringify(message));
            });
        }
    }
    client = null;
};

// Create a listener function for the "connection" event.
// Each time we get a connection, the following function
// is called.
wss.on('connection', function connection(ws) {
    client = "player";
    if (first) {
        clientMaster = ws;
        first = false;
        client = "master";
    } 
    // Store the remote systems IP address as "remoteIp".
    //var remoteIp = ws.upgradeReq.connection.remoteAddress;
    console.log(client);
    let msg = {
        "client": client
    }
    wss.clients.forEach(client => client.send(JSON.stringify(msg)));
    // Print a log with the IP of the client that connected.
    console.log('Connection received: ');

    // Add a listener which listens for the "message" event.
    // When a "message" event is received, take the contents
    // of the message and pass it to the broadcast() function.
    ws.on('message', wss.broadcast);
});