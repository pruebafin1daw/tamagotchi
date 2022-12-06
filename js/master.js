class Master {
    
    init(config, communication) {
        this.config = config;
        this.communication = communication;
        this.communication.handler = this;
        this.players = [];
        this.map = new Array();
        this.spanw = [];
        for(let i=0; i<this.config.width; i++) {
            this.map[i] = new Array();
            for(let j=0; j<this.config.height; j++) {
                this.map[i][j] = {
                    x: i,
                    y: j,
                    endPoint : false,
                    players: [],
                    burrow: false
                }
                if((i==0) || (i==this.config.width-1) || (j==0) || (j==this.config.height-1)) {
                    if((i+j)%2) {
                        this.map[i][j].burrow = true;
                        this.spanw.push(this.map[i][j]);
                    }
                } else if(Math.random() < this.config.porcentageBurrow) {
                    this.map[i][j].burrow = true;
                }
            }
        }
        this.map[Math.floor(this.config.width/2)][Math.floor(this.config.height/2)].endPoint = true;
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
        if(!this.players.find(x => x.id == content.id)) {
            let player = {
                id: content.id,
                name : "",
                x: 0,
                y: 0,
                inBurrow: true,
                energy: 100
            }
            let index = Math.floor(Math.random() * this.spanw.length);
            let cell = this.spanw.splice(index, 1);
            player.x = cell.x;
            player.y = cell.y;
            this.map[cell.x][cell.y].players.push(player);
            this.players.push(player);
            let object = {
                id: player.id,
                funct: "initClient",
                x: player.x,
                y: player.y,
                map: this.clientMap
            }
            this.communication.send(1, object);
            if(this.players.length >= 4) {
                this.gameStart();
            }
        }
    }

    gameStart() {
        let object = {
            funct: "showMap"
        }
        this.communication.send(1, object);
        object.funct = "movePlayer";
        this.communication.send(1, object);
        this.threadManage = setInterval(()=>this.manageShift(), 500);
    }

    manageShift() {
        this.manageBattles();
        this.restoreLife();
        this.killPlayer();
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
        let object;
        this.players(player => {
            if(player.energy == 0) {
                object = {
                    id: player.id,
                    funct: "deadPlayer"
                }
                this.comunication.send(1, object);
                this.players.slice(this.players.indexOf(player), 1);
            } else {
                object = {
                    id: player.id,
                    energy : player.energy,
                    funct: "refreshLife"
                }
                this.comunication.send(1, object);
            }
        });
    }
    
    movePlayer(msg) {
        let oldPlayer = this.players.find(x => x.id == msg.id);
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
            let object;
            if(box.players.length == 0) {
                if(box.burrow) {
                    player.inBurrow = true;
                }
                player.x = newPositionX;
                player.y = newPositionY;
                this.updateMap(player, oldPlayer, box, oldBox);
                object = {
                    id: player.id,
                    x: player.x,
                    y: player.y
                }
                if(box.endPoint) {
                    object.funct = "winnerPlayer";
                    this.threadManage = null;
                }
                else {
                    object.funct = "updatePos";
                }
                this.communication.send(1, object);
            } else {
                object = {
                    id: player.id
                }
                if(box.burrow) {
                    object.funct = "occupiedBurrow"
                } else {
                    object.funct = "battle"
                    player.x = newPositionX;
                    player.y = newPositionY;
                    this.updateMap(player, oldPlayer, box, oldBox);
                    object.x = player.x;
                    object.y = player.y;
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
    }
}

export { Master };
