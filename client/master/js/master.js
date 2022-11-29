import { Board } from './control/board.js';
import { Connection } from './connection.js';

class Master {
    init() {
        let connection = new Connection();
        let board = new Board();

        // CONNECTION
        connection.init({
            'ip': 'localhost',
            'port': '8023',
            'board': board
        });

        // BOARD
        board.init({
            // CHANGE FOR MASTER CHOICE (SQUARE)
            'boardRows': 17,
            'boardCols': 17,
            'socket': connection.socket
        });
    }

}

let master = new Master();
master.init();