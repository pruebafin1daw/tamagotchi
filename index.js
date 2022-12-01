import { v4 as uuidv4 } from 'uuid';
import { WebSocketServer } from 'ws';

// Create a new WebSocketServer running on port 7007.
var wss = new WebSocketServer({ port: 8023 });
var clientMaster = null;
var first = true;
var clients = [];
// Output a log to say the server is running.
console.log("Server is Running...");

// Create a "broadcast" function on our WebSocketServer object.
// The function will take a "msg" paramter. When called, it will
// loop through all the connected clients and send them the msg.
wss.broadcast = function broadcastMsg(msg) {
    let data = JSON.parse(msg);
    console.log(data);
    const message = {
        type: 'mensaje',
        valor: data.message,
        id: data.id
    }
    // console.log("Mensaje " + wss.clients)
    if (data.tipo != null) {
        if (data.tipo == 0) {
            clientMaster.send(JSON.stringify(message));
        } else if (data.id) {
            let client = clients.find(item => item.id == data.id);
            if (client) {
                client.socket.send(JSON.stringify(message));
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
wss.on('connection', function connection(ws, request, client) {
    ws.on('message', wss.broadcast);
    if (first) {
        clientMaster = ws;
        first = false;
        const message = {
            type: 'mensaje',
            valor: 'master'
        }
        clientMaster.send(JSON.stringify(message));
    } else {
        let id = uuidv4();
        clients.push({
            id,
            socket: ws
        });
        const message = {
            type: 'mensaje',
            valor: 'hello',
            id
        }
        ws.send(JSON.stringify(message));
    }
});