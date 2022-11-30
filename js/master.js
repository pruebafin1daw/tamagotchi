class Master {
        
    init(config,communication) {
        this.communication = communication;
        this.communication.handler = this;
        this.players = [];
        this.map = new Array();
        this.edges = [];
        this.clientMap = [];
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
                        this.map[i][j].burrow = true;
                        this.edges.push(this.map[i][j]);       

                } else if(Math.random() < config.porcentage){
                     this.map[i][j].burrow = true;
                    
                }
            }          
        }
        this.clientMap = this.map.flatMap(x => x).filter(slot => slot.burrow).map(newSlot => {
            return {
                y: newSlot.y,
                x: newSlot.x,
                burrow : newSlot.burrow
            }
        })        
    }

    newMsg(msg,origin) {
        switch(msg.valor) {
            case "newClient": 
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
                energy: 100,
                map : this.clientMap
            }

            let index = Math.floor(Math.random() * this.edges.length);
            let cell = this.edges.splice(index,1);
            cell.burrowPlayer = player;
            player.x = cell.x;
            player.y = cell.y;
            
            this.players.push(player);
        }
    }
}

export { Master };