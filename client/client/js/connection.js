import { Board } from './control/board.js';
import { Player } from './control/player.js';

class Connection {
    board = null;
    socket = null;
    state = false;
    master = false;

    init(config) {
        this.board = new Board();
        this.socket = new WebSocket("ws://" + config.ip + ":" + config.port);

        this.socket.onopen = () => {
            this.state = true;
            let name = prompt('Enter your name');

            // DRAW BOARD
            const msgBoard = {
                'tipo': 0,
                'mensaje': 'drawBoard'
            }
            this.socket.send(JSON.stringify(msgBoard));

            // ADD PLAYER
            if (name) {
                const msg = {
                    'tipo': 1,
                    'mensaje': ['addPlayer', name]
                }
                this.socket.send(JSON.stringify(msg));
            } else window.location.reload();
        };

        this.socket.onmessage = (event) => {
            let data = JSON.parse(event.data);
            switch(data.valor[0]) {
                case "gameOpened":
                    window.location.reload();
                    break;
                case "draw":
                    this.board.init(data.valor[1]);
                    break;
                case "player":
                    let playerClient = data.valor[1];
                    this.player = new Player(this.socket);
                    this.player.init({
                        'type': playerClient.type,
                        'id': playerClient.id,
                        'name': playerClient.name,
                        'x': playerClient.x,
                        'y': playerClient.y,
                        'status': playerClient.status
                    });
                    break;
                case "win":
                    this.player.stopMovement(true);
                    break;
            }
        };

        this.socket.onclose = () => {
            this.state = false;
        };

        this.socket.onerror = () => {
            this.state = false;
        };
    }
}

export { Connection };