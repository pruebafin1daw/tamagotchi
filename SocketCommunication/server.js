var WebSocketServer = require("ws").Server;
const { v4: uuidv4 } = require('uuid');

var wss = new WebSocketServer({port: 8023});
var clientMaster = null;
var clients = [];
var first = true;

const MSGS_NEW_PLAYER = 0;
const MSGS_MASTER = 1;
const MSGS_CONNECTED = 2;
const MSGS_GENERIC = 3;

const MSGS = [
	{
	 	type: 'mensaje',
		valor: 'newClient'
	},
	{
		type: 'mensaje',
		valor: 'master'
	},
	{
		type: 'mensaje',
		valor: 'Has sido conectado'
	},
	{
		type: 'mensaje'
	}
]

console.log("Server is Running...");

wss.broadcast = function broadcastMsg(msg) {
    let data = JSON.parse(msg);
	
    let generic = MSGS[MSGS_GENERIC];
	generic.valor = JSON.parse(msg).mensaje;

	//TODO: REFACTORIZAR
    if (data.tipo != null) {
    	if (data.tipo == 0) {
    		clientMaster.send(JSON.stringify(generic));
    	} 
		else if(data.id) {
			let client = clients.find(item => item.id == data.id);
			
			if(client) {
				client.socket.send(JSON.stringify(generic));
			}
		} 
		//Para todos
		else {
    		wss.clients.forEach(function each(client) {
				client.send(JSON.stringify(generic));
			});
    	}
    }
};

function heartbeat() {
	this.isAlive = true;
}

wss.on('connection', function connection(ws, request, client) {
	ws.isAlive = true;
	ws.on('pong', heartbeat);
	//Lo hacemos admin si es el primero
    if (first) {
    	clientMaster = ws;
    	first = false;
		
		let master = MSGS[MSGS_MASTER];

		clientMaster.send(JSON.stringify(master));
	
    } else {
		//Si no es el primero le damos un id
		let id = uuidv4();

		//Lo metemos en la lista de clientes del SERVIDOR
		clients.push({
			id: id,
			socket: ws
		});

		var connected = MSGS[MSGS_CONNECTED];
		connected.id = id;

		var newClient = MSGS[MSGS_NEW_PLAYER];
		newClient.id = id;

		//Le mandamos un mensaje a los dos
		ws.send(JSON.stringify(connected));
		clientMaster.send(JSON.stringify(newClient));
	}	

    ws.on('message', wss.broadcast);
});

const interval = setInterval(function ping() {
	wss.clients.forEach(function each(ws) {
		if(ws.isAlive === false) return ws.close;

		ws.isAlive = false;
		ws.ping();
	})
},1000);

wss.on('close', function close() {
	clearInterval(interval);
});