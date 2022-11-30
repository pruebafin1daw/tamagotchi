const { v4: uuidv4 } = require('uuid');
var WebSocketServer = require("ws").Server;

var wss = new WebSocketServer({port: 8023});
var clientMaster = null;
var first = true;
var clients = [];

console.log("Server is Running...");
wss.broadcast = function broadcastMsg(msg) {
    
    let data = JSON.parse(msg);
    let message = null;
    message = {
        type: 'mensaje',
        valor: JSON.parse(msg).mensaje
    }
    if (data.tipo != null || data.id) {
    	if (data.tipo == 0) {
    		clientMaster.send(JSON.stringify(message));
    	}else if (data.tipo == -1){
            first = true;
        }
        else if(data.id){
            let client = clients.find(item => item.id == data.id);
            if(client){
                client.socket.send(JSON.stringify(message));
            }
        } else {
    		wss.clients.forEach(function each(client) {
                if(client != clientMaster){
                    client.send(JSON.stringify(message));
                }
		    });
    	}
    }
};

wss.on('connection', function connection(ws, request, client) {
    ws.on('message', wss.broadcast);
    if (first) {
    	clientMaster = ws;
    	first = false;
        const message = {
            type: 'mensaje',
            valor: {
                type: "master"
            }
        }
        clientMaster.send(JSON.stringify(message));
    } else {
        let id = uuidv4();
        clients.push({
            id : id,
            socket : ws
        });
        const message = {
            valor: {
                type: 'identity',
                id : id,
            },
        }
        ws.send(JSON.stringify(message));
    }
});
