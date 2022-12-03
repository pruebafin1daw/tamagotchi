class Master {
        
    init(config, communication) {
        this.config = config;
        this.communication = communication;
        this.communication.handler = this;
        this.players = [];
        this.map = new Array();
        this.edges = [];
        for (let i=0;i<this.config.height;i++) {
            this.map[i] = new Array();
            for (let j=0;j<this.config.width;j++) {
                this.map[i][j] = {
                    y: i,
                    x: j,
                    endPoint : false,
                    players: [],
                    burrow: false,
                    burrowPlayer: null
                }
                if ((i==0) || (i==this.config.height-1) || (j==0) || (j==this.config.width-1)) {
                    if ((i+j)%2) {
                        this.map[i][j].burrow = true;
                        this.edges.push(this.map[i][j]);
                    }
                } else if(Math.random() < this.config.porcentage){
                    this.map[i][j].burrow = true;
                }
            }
        }
        this.map[this.config.height/2][this.config.width/2].endPoint = true;
        this.flag = this.map[this.config.height/2][this.config.width/2];
        let clientMap = { 
            width : this.config.width,
            height : this.config.height,
            burrow : this.map.flatMap(num => num).filter(item => item.burrow).map(item => {
                return {
                    y : item.y,
                    x : item.x
                }
            })
        }
        console.log(clientMap);
    }

    newMsg(msg,origin) {
        switch(msg.valor) {
            case "nuevo": 
                this.newPlayer(origin);
                break;
        }
    }

    newPlayer(origin) {
        if (!this.players.find(x => x.origin === origin)) {
            let player = {
                origin: origin,
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
            let player = msg.player;
            let positionX = player.x;
            let positionY = player.y;
            let position, maxPosition, newPositionX, newPositionY;
            switch (msg.movement) {
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
            if (position < maxPosition) {
                let box = this.map[newPositionY][newPositionX];
                let oldBox = this.map[positionY][positionX];
                if (box.players.length == 0) {
                    if (box.burrow) {
                        player.inBurrow = true;
                    }
                    player.x = newPositionX;
                    player.y = newPositionY;
                    this.updateMap(player, box, oldBox);
                } else {
                    if (box.burrow) {
                        this.comunication.send("occupiedBurrow", player); // Communication debe indicar al cliente que ya hay un jugador en la madriguera
                    } else {
                        this.comunication.send("battle", player); // Communication debe indicar al cliente que ha entrado en batalla
                        player.x = newPositionX;
                        player.y = newPositionY;
                        this.updateMap(player, box, oldBox);
                    }
                }
            }
    }

    updateMap(player, box, oldBox) {
        this.players.slice(this.players.indexOf(player), 1, player);
        box.players.push(player);
        this.map.slice(this.map.indexOf(box), 1, box);
        oldBox.players.slice(oldBox.players.indexOf(player), 1);
        this.map.slice(this.map.indexOf(oldBox), 1, oldBox);
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
            else if (!this.players.find(i => i.x == player.x && i.y == player.y)) {
                player.energy += this.config.lifeRestoredAlone;
            }
        });
    }

    killPlayer() {
        this.players(player => {
            if(player.energy == 0) {
                this.comunication.send("deadPlayer", player); // Communication debe indicar al cliente que ha muerto y cerrar la conexión
                this.players.slice(this.players.indexOf(player), 1);
            }
        });
    }

    endgame() { // Método que debe de ser lanzado al comienzo de la partida con una promesa
        if (this.players.find(player => player.x == this.flag.x && player.y == this.flag.y)) {
            this.comunication.send("winnerPlayer", player); // Communication debe indicar al cliente que ha ganado y terminar el juego
        }
    }
}

export { Master };
