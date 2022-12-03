class Master {
        
    init(config,communication) {
        this.communication = communication;
        this.communication.handler = this;
        this.players = [];
        this.map = new Array();
        this.edges = [];
        for (let i=0;i<config.height;i++) {
            this.map[i] = new Array();
            for (let j=0;j<config.width;j++) {
                this.map[i][j] = {
                    y: i,
                    x: j,
                    endPoint : false,
                    players: [],
                    burrow: false,
                    burrowPlayer: null
                }
                if ((i==0) || (i==config.height-1) || (j==0) || (j==config.width-1)) {
                    if ((i+j)%2) {
                        this.map[i][j].burrow = true;
                        this.edges.push(this.map[i][j]);
                    }
                } else if(Math.random() < config.porcentage){
                    this.map[i][j].burrow = true;
                }
            }
        }
        let clientMap = { 
            width : config.width,
            height : config.height,
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

    manageShift() { // Método que debe de ser lanzdo al comienzo de la partida con una promesa cada X tiempo
        this.manageBattles();
        this.restoreLife();
        this.killPlayer();
    }

    manageBattles() {
        this.players(i => {
            this.players(j => {
                if(i.x == j.x && i.y == j.y) {
                    j.energy -= 10; // Valor pasado por config?
                }
            });
        });
    }

    restoreLife() {
        this.players(player => {
            if(player.inBurrow) {
                player.energy += 10; // Valor pasado por config?
            }
            else if (!this.players.find(i => i.x == player.x && i.y == player.y)) {
                player.energy += 2; // Valor pasado por config?
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
}

export { Master };
