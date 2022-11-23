import { Square } from './square.js';
import { Player } from './player.js';

const squareType = 0;
const burrowType = 1;
const goalType = 10;

class Board {
    init(config) {
        this.generateBoard(config);
        this.setSquares();
        this.setGoal();
        this.setPlayers();
    }

    generateBoard(config) {
        this.boardLength = config.boardLength;

        this.board = new Array(this.boardLength);
        for (let i = 0; i < this.board.length; i++) {
            this.board[i] = new Array(this.boardLength);
        }
    }

    setSquares() {
        let possibleSquares = [squareType, burrowType];
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                let square = new Square();
                square.init({
                    'type': possibleSquares[Math.floor(Math.random() * possibleSquares.length)],
                    'players': null
                });
                this.board[i][j] = square;
            }
        }
    }

    setGoal() {
        let middle = Math.round(this.boardLength / 2 - 1);
        let square = new Square();
        square.init({
            'type': goalType,
            'players': null
        });
        this.board[middle][middle] = square;
    }

    setPlayers() {
        // CHANGE BY MASTER PREFER DATA !IMPORTANT!

        let player = new Player(this);
        player.init({
            'name': 'Pablo',
            'x': 0,
            'y': 5,
            'status' : 100
        });

        this.board[player.x][player.y] = player;
    }
}

export { Board }