class Master {
        
    init(config, communication) {
        this.config = config;
        this.communication = communication;
        this.communication.handler = this;
        this.players = [];
        this.map = new Array();
        this.edges = [];
        for(let i=0; i<this.config.width; i++) {
            this.map[i] = new Array();
            for(let j=0; j<this.config.height; j++) {
                this.map[i][j] = {
                    x: i,
                    y: j,
                    endPoint : false,
                    players: [],
                    burrow: false,
                    burrowPlayer: false
                }
                if((i==0) || (i==this.config.width-1) || (j==0) || (j==this.config.height-1)) {
                    if((i+j)%2) {
                        this.map[i][j].burrow = true;
                    }
                    this.edges.push(this.map[i][j]);
                } else if(Math.random() < this.config.porcentage) {
                    this.map[i][j].burrow = true;
                }
            }
        }
        this.map[this.config.width/2][this.config.height/2].endPoint = true;
        this.flag = this.map[this.config.width/2][this.config.height/2];
        this.clientMap = { 
            width : this.config.width,
            height : this.config.height,
            burrows : this.map.flatMap(num => num).filter(item => item.burrow).map(item => {
                return {
                    x : item.x,
                    y : item.y
                }
            })
        }
    }

    newMsg(content) {
        this.eval(content.funct(content));
    }

    newPlayer(content) {
        if(!this.players.find(x => x.id === content.id)) {
            let player = {
                id: content.id,
                name : "",
                x: 0,
                y: 0,
                inBurrow: true,
                energy: 100
            }

            let index = Math.floor(Math.random() * this.edges.length);
            let cell = this.edges.splice(index,1);
            cell.burrowPlayer = player;
            player.x = cell.x;
            player.y = cell.y;
            this.players.push(player);
        }
    }

    manageShift() { // Método que debe de ser lanzado al comienzo de la partida con una promesa cada X tiempo
        this.manageBattles();
        this.restoreLife();
        this.killPlayer();
    }
    
    movePlayer(msg) {
            let oldPlayer = this.players.find(x => x.id === msg.id);
            let player = oldPlayer;
            let positionX = player.x;
            let positionY = player.y;
            let position, maxPosition, newPositionX, newPositionY;
            switch(msg.movement) {
                case "up": {
                position = 0;
                maxPosition = positionX;
                newPositionX = positionX - 1;
                newPositionY = positionY;
                break;
                }
                case "left": {
                position = 0;
                maxPosition = positionY;
                newPositionX = positionX;
                newPositionY = positionY - 1;
                break;
                }
                case "right": {
                position = positionY;
                maxPosition = this.map.length;
                newPositionX = positionX;
                newPositionY = positionY + 1;
                break;
                }
                case "down": {
                position = positionX;
                maxPosition = this.map.length;
                newPositionX = positionX + 1;
                newPositionY = positionY;
                break;
                }
            }
            if(position < maxPosition) {
                let box = this.map[newPositionY][newPositionX];
                let oldBox = this.map[positionY][positionX];
                if(box.players.length == 0) {
                    if (box.burrow) {
                        player.inBurrow = true;
                    }
                    player.x = newPositionX;
                    player.y = newPositionY;
                    this.updateMap(player, oldPlayer, box, oldBox);
                } else {
                    object = {
                        id: player.id,
                        func: actions
                    }
                    if(box.burrow) {
                        object.action = "occupiedBurrow"
                    } else {
                        object.action = "battle"
                        player.x = newPositionX;
                        player.y = newPositionY;
                        this.updateMap(player, oldPlayer, box, oldBox);
                    }
                    this.communication.send(1, object);
                }
            }
    }

    updateMap(player, oldPlayer, box, oldBox) {
        this.players.slice(this.players.indexOf(oldPlayer), 1, player);
        box.players.push(player);
        this.map.slice(this.map.indexOf(box), 1, box);
        oldBox.players.slice(oldBox.players.indexOf(oldPlayer), 1);
        this.map.slice(this.map.indexOf(oldBox), 1, oldBox);
        object = {
            id: player.id,
            func: refreshMap
        }
        object.energy = player.energy;
        object.x = player.x;
        object.y = player.y;
        this.communication.send(1, object);
    }
        
    manageBattles() {
        this.players(i => {
            this.players(j => {
                if(i.x == j.x && i.y == j.y) {
                    j.energy -= this.config.lifeTakenDamage;
                }
            });
        });
    }

    restoreLife() {
        this.players(player => {
            if(player.inBurrow) {
                player.energy += this.config.lifeRestoredBurrow;
            }
            else if(!this.players.find(i => i.x == player.x && i.y == player.y)) {
                player.energy += this.config.lifeRestoredAlone;
            }
        });
    }

    killPlayer() {
        this.players(player => {
            if(player.energy == 0) {
                object = {
                    id: player.id,
                    func: "deadPlayer"
                }
                this.comunication.send(1, object); // Communication debe indicar al cliente que ha muerto y cerrar la conexión
                this.players.slice(this.players.indexOf(player), 1);
            }
        });
    }

    endgame() { // Método que debe de ser lanzado al comienzo de la partida con una promesa
        if(this.players.find(player => player.x == this.flag.x && player.y == this.flag.y)) {
            object = {
                id: player.id,
                func: "winnerPlayer"
            }
            this.comunication.send(1, object); // Communication debe indicar al cliente que ha ganado y terminar el juego
        }
    }
}

export { Master };
