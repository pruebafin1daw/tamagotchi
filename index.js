// Import the ws module as a variable called WebSocketServer.
var WebSocketServer = require("ws").Server;

const { v4: uuidv4 } = require('uuid');

// Create a new WebSocketServer running on port 8023.
var wss = new WebSocketServer({port: 8023});
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
    if(data.type != null) {
    	if(data.type == 0) {
    		clientMaster.send(JSON.stringify(data.content));
    	}else if(data.content.id) {
            let client = clients.find(item => item.id == data.content.id);
            if(client) {
                client.socket.send(JSON.stringify(data.content));
                if(data.content.funct ==  "deadPlayer") {
                    client.socket.close();
                    //Search on clients the client index
                    let indexOf = clients.findIndex(object => object.id == client.id);
                    //remove client with that index
                    clients.splice(indexOf, 1);
                }
            }
        }else {
    		wss.clients.forEach(function each(client) {
                if(client != clientMaster){
                    client.send(JSON.stringify(data.content));
                };
                
            });
    	}
    }
};

// Create a listener function for the "connection" event.
// Each time we get a connection, the following function
// is called.
wss.on('connection', function connection(ws) {
    ws.on('message', wss.broadcast);
    if(first) {
    	clientMaster = ws;
    	first = false;
        const message = {
            funct: 'master'
        }
        clientMaster.send(JSON.stringify(message));
    } else {
        let id = uuidv4();
        clients.push({
            id : id,
            socket : ws
        });
        const message = {
            funct: 'newClient',
            id : id
        }
        ws.send(JSON.stringify(message));
    }
});
