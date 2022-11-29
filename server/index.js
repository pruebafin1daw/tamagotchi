var WebSocketServer = require("ws").Server;

var wss = new WebSocketServer({ port: 8023 });
var clientMaster = null;
// var first = true;

wss.broadcast = function broadcastMsg(msg, ws) {
    let data = JSON.parse(msg);
    let message = {
        type: 'mensaje',
        valor: JSON.parse(msg).mensaje
    }
    if (data.tipo != null) {
        if (data.tipo == 0) {
            if (data.mensaje == 'master') {
                clientMaster = ws;
                message = {
                    type: 'maestro',
                    valor: 'Soy maestro'
                }
                clientMaster.send(JSON.stringify(message));
            }
            if (clientMaster != null) {
                clientMaster.send(JSON.stringify(message));
            }
        } else {
            wss.clients.forEach(function each(client) {
                client.send(JSON.stringify(message));
            });
        }
    }
};

wss.on('connection', function connection(ws) {
    // if (first) {
    //     clientMaster = ws;
    //     first = false;
    // }
    ws.on('message', (msg) => {
        wss.broadcast(msg, ws);
    });
});