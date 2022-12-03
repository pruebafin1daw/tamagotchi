class Master {
        container = document.getElementById('container');
    init(config,communication) {
        this.communication = communication;
        this.communication.handler = this;
        this.players = [];
        this.map = new Array();
        this.edges = [];
        this.clientMap = [];
        this.getSize(config);
        /* for (let i=0;i<config.height;i++) {
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
        this.clientMap = this.map.flatMap(x => x).filter(slot => slot.burrow).map(newSlot => {
            return {
                size : this.map.length,
                y : newSlot.y,
                x : newSlot.x,
                burrow : newSlot.burrow
            }
        })    */
        //TO DO Funcion Dibujar Mapa     
    }

    getSize(config){
        let form = document.createElement("form");
        this.container.appendChild(form);
        let map = document.createElement("input");
        map.type = 'text';
        map.placeholder = "Size of map";
        form.appendChild(map);
        /*AQUI SE PONDRÍA EL NÚMERO DE JUGADORES
        let players = document.createElement("input");
        players.type = 'text';
        players.placeholder = "Players";
        form.appendChild(players);*/
        let button = document.createElement("input");
        button.type = "button";
        button.value = "Submit";
        button.addEventListener("click", ()=>{
            let mapSize = map.value;
            if(mapSize % 2 == 0){
                let text = document.createElement("p");
                text.innerHTML = "Write an odd number";
                form.appendChild(text);
            }else{
                let size = map.value;
                config.width = size;
                config.height = size;
                //JUGADORES : x = players.value;
                form.style.display = "none";
                this.createMap(config);
            }
        });
        form.appendChild(button);
    }

    createMap(config){
        let finish = config.width / 2 - 0.5;
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
                if(i == finish && j == finish){
                    this.map[i][j].endPoint = true;
                }
            }          
        }
        console.log(this.map);
        //TO DO Dibujar mapa
        this.drawMap();
        this.clientMap = this.map.flatMap(x => x).filter(slot => slot.burrow).map(newSlot => {
            return {
                size : this.map.length,
                y : newSlot.y,
                x : newSlot.x,
                burrow : newSlot.burrow
            }
        });   
    }

    drawMap(){
        let table = document.createElement('table');
        for (let i = 0; i < this.map.length; i++) {
            let row = document.createElement('td');
            for (let j = 0; j < this.map[i].length; j++) {
                let cell = document.createElement('tr');
                if(this.map[i][j].endPoint == true){
                    cell.innerHTML = 'F ';
                }else if(this.map[i][j].burrow == true){
                    cell.innerHTML = 'M ';
                }else{
                    cell.innerHTML = '0 ';
                }
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        this.container.appendChild(table);
    }

    newMsg(msg,origin) {
        switch(msg.valor) {
            case "newClient": 
                this.newPlayer(origin);
                break;
            //TO DO Funciones importantes 
            //Ejemplo movimiento
        }
        //TO DO llamada a funcion dibujar mapa
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
            //TO DO Introducir nombre
            
            this.players.push(player);
        }
    }

    
}

export { Master };