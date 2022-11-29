import { Square } from './square.js';
import { Player } from './player.js';

const squareType = 0;
const burrowType = 1;
const playerType = 2;
const burrowPlayerType = 3;
const goalType = 10;

class Board {
    socket = null;
    loop = null;
    posPlayers = [];
    players = [];
    idPlayer = 1;

    init(config) {
        this.board = config.board;
        this.socket = config.socket;
        this.generateBoard(config);
        this.drawBoard(document.getElementById('content'), document.createElement('table'));
        this.startTamagotchi();
    }

    addPlayer(name) {
        // POSSIBLE APPARITIONS
        let possibleY = [0, this.boardCols - 1];
        let posX = Math.floor(Math.random() * this.boardRows), posY;
        posY = Math.floor(Math.random() * this.boardCols);
        if (posX != 0 && posX != this.boardRows - 1) {
            posY = possibleY[Math.floor(Math.random() * possibleY.length)];
        }

        // PLAYER INIT
        let player = new Player();
        player.init({
            'type': playerType,
            'id': this.idPlayer,
            'name': name,
            'x': posX,
            'y': posY,
            'status': '100' // INITIAL STATUS
        });

        this.idPlayer++;

        let message = {
            'tipo': 1,
            'mensaje': ['player', player]
        }
        this.socket.send(JSON.stringify(message));

        // PLAYER POSITION
        let pos = player.x + "" + player.y;
        if (!this.posPlayers.includes(pos)) {
            this.posPlayers.push(pos);
            this.players.push(player);
        }
    }

    checkBurrowSquare(player, x, y) {
        let square = this.board[y][x];
        if (square.type == burrowType) {
            // GRASS
            square.init({'type': squareType, 'x': player.x, 'y': player.y, 'players': null});
            this.board[square.y][square.x] = square;

            // PLAYER POSITION RENEW
            player.x = x; player.y = y;
            
            // BURROW
            let burrowPlayer = new Square();
            burrowPlayer.init({'type': burrowPlayerType, 'x': x, 'y': y, 'players': null});
            this.board[burrowPlayer.y][burrowPlayer.x] = burrowPlayer;
        } else {
            if (this.board[player.y][player.x].type == burrowPlayerType) {
                square.init({'type': burrowType, 'x': player.x, 'y': player.y, 'players': null});
            }
            
            this.board[player.y][player.x] = square;
            player.x = x; player.y = y;
            this.board[y][x] = player;
        }
    }

    checkMovement(id, direction) {
        let player = this.players.find(plyer => {
                return plyer.id == id
            });
        let x = player.x;
        let y = player.y;

        switch (direction) {
            case "up":
                y = player.y - 1;
                break;
            case "left":
                x = player.x - 1;
                break;
            case "down":
                y = player.y + 1;
                break;
            case "right":
                x = player.x + 1;
                break;
        }
        if ((y >= 0 && y < this.boardCols) && (x >= 0 && x < this.boardRows)) return true;
        return false;
    }

    checkWin(x, y) {
        if (this.board[y][x].type == goalType) {
            let message = {
                'tipo': 1,
                'mensaje': ['win']
            }
            this.socket.send(JSON.stringify(message));
            return true;
        }
        return false;
    }

    drawBoard(content, table) {
        // BOARD COPY
        this.boardCopied = this.board.map((arr) => {return arr.slice();});

        // PLAYERS
        for (let player of this.players) {
            if (this.boardCopied[player.y][player.x].type != burrowPlayerType) {
                this.boardCopied[player.y][player.x] = player;
            }
        }

        // HTML
        content.innerHTML = "";
        for (let i = 0; i < this.boardCopied.length; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < this.boardCopied[i].length; j++) {
                let cell = document.createElement('td');
                let img = document.createElement('div');

                let pos = this.boardCopied[i][j].type;
                if (pos == burrowType) img.className = 'square bush';
                else if (pos == squareType) img.className = 'square grass';
                else if (pos == playerType) img.className = 'square player';
                else if (pos == burrowPlayerType) img.className = 'square burrowPlayer';
                else img.className = 'square goal';

                cell.appendChild(img);
                row.appendChild(cell);
            }
            table.appendChild(row);
            this.table = table;
        }
        content.appendChild(table);
    }

    generateBoard(config) {
        this.boardRows = config.boardRows;
        this.boardCols = config.boardCols;
        this.board = new Array(this.boardRows);
        
        for (let i = 0; i < this.board.length; i++) {
            this.board[i] = new Array(this.boardCols);
        }

        this.setSquares();
    }

    movePlayer(id, direction) {
        let player = this.players.find(plyer => {
            return plyer.id == id
        });

        if (this.checkMovement(id, direction)) {
            let x = '', y = '';
            switch(direction) {
                case "up":
                    x = player.x; y = player.y - 1;
                    break;
                case "left":
                    x = player.x - 1; y = player.y;
                    break;
                case "down":                                                      
                    x = player.x; y = player.y + 1;
                    break;
                case "right":
                    x = player.x + 1; y = player.y;
                    break;
            }

            // CHECK WIN
            let won = this.checkWin(x, y);

            if (!won) {
                // CHECK BURROW
                this.checkBurrowSquare(player, x, y);

                let message = {
                    'tipo': 1,
                    'mensaje': ['move', player.name, direction, x, y]
                }
                this.socket.send(JSON.stringify(message));
            }
        }
    }

    setSquares() {
        let square = null, config = null;
        let middle = Math.round(this.boardRows / 2 - 1);

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                square = new Square();

                // NORMAL SQUARE
                if (i != middle || j != middle) {
                    config = {
                        'type': Math.floor(Math.random() * 1 + 0.03), // 0.0X == PROBABILITY FOR SQUARE BUSH
                        'x': i,
                        'y': j,
                        'players': null
                    }
                } else config = {'type': goalType, 'x': i, 'y': j, 'players': null}; // GOAL SQUARE

                square.init(config);
                this.board[i][j] = square;
            }
        }
    }

    startTamagotchi() {
        this.loop = setInterval(() => {
            this.drawBoard(document.getElementById('content'), document.createElement('table'));
            
            let message = {
                'tipo': 1,
                'mensaje': ['drawBoard', [...this.board]]
            }
            this.socket.send(JSON.stringify(message));
        }, 16);
    }
}

export { Board }