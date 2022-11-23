var WebSocketServer = require("ws").Server;

var wss = new WebSocketServer({port: 8023});
var clientMaster = null;
var first = true;

console.log("Server is Running...");

wss.broadcast = function broadcastMsg(msg) {
    /*let data = JSON.parse(msg);
    const message = {
	type: 'mensaje',
	valor: JSON.parse(msg).mensaje
    }
    console.log("Desde mensajes: "+ data.tipo);
    if (data.tipo != null) {
    	if (data.tipo == 0) {
    		clientMaster.send(JSON.stringify(message));
    	} else {
    		wss.clients.forEach(function each(client) {
			client.send(JSON.stringify(message));
		});
    	}
    }*/
    let data = msg;
    console.log("Mensaje enviado: " + data);
    clientMaster.send("Mensaje recibido");
    /*client.send("Mensaje recibido");*/
};

wss.on('connection', function connection(ws) {
    if (first) {
    	clientMaster = ws;
    	first = false;
    }	

    console.log('Connection received: ');

    ws.on('message', wss.broadcast);
});