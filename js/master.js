class Master {
        container = document.getElementById('container');
    init(config,communication) {
        this.communication = communication;
        this.communication.handler = this;
        this.players = [];
        this.map = new Array();
        this.edges = [];
        this.clientMap = [];
        //Copia de mapa con solo el nombre de cllientes?
        //Idea en proceso
        this.clientPlayers = [];
        this.getSize(config);  
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
                    this.map[i][j].burrow = false;

                }
            }          
        }
        console.log(this.map);
        this.drawMap();
        this.clientMap = this.map.flatMap(x => x).filter(slot => slot.burrow).map(newSlot => {
            return {
                size : this.map.length,
                y : newSlot.y,
                x : newSlot.x,
                burrow : newSlot.burrow
            }
        });
        // this.clientPlayers = this.players.map(newPlayerArray => {
        //     return {
        //         player : newPlayerArray.name
        //     }
        // });

    }

    drawMap(){
        let board = document.querySelector('table');
        if(board) board.style = "display:none;";
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
                if(this.map[j][i].players.length != 0){
                    cell.innerHTML = 'X ';
                }
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        this.container.appendChild(table);
    }

    newMsg(msg,origin) {
        if(msg.valor.direction){
            var direction = msg.valor.direction;
            var id = msg.valor.id;
            msg.valor = msg.valor.valor;
        }
        if(msg.valor.userName){
            var name = msg.valor.name;
            var id = msg.valor.id;
            msg.valor = msg.valor.valor;
        }
        switch(msg.valor) {
            case "newClient": 
                this.newPlayer(origin);
                break;
            case "inputData":
                break;
            //Implementar aquí los diferentes casos de mensajes que
            //puede recibir el master y su respuesta
            case "username":
                this.usernameUpdate(name, id);
                break;
            case "move":
                this.controlMovement(direction, id);
                break;
            default:
                //Este es el jugador que aparece en la consola de master
                console.log(msg.valor);
                break;
            //TO DO Funciones importantes 
            //Ejemplo movimiento
        }
        console.log("Master recieved a message");
    }

    newPlayer(origin) {
        if (!this.players.find(x => x.origin === origin)) {
            let player = {
                origin: origin,
                name : "",
                playerX : 0,
                playerY : 0,
                inBurrow: true,
                energy: 100,
                map : this.clientMap,
                players : this.clientPlayers
            }

            let index = Math.floor(Math.random() * this.edges.length);
            let cell = this.edges.splice(index,1);
            console.log(cell);
            cell.burrowPlayer = player;
            player.playerX = cell[0].x;
            player.playerY = cell[0].y;
            console.log(player);
            //TO DO Introducir nombre
            
            this.players.push(player);
            this.map[cell[0].x][cell[0].y].players.push(player);
            this.clientPlayers.push(player.name);
            //Esto pasa los datos del jugador a todo el mundo junto con su id
            //Habrá que modficarla a medida que avancemos para que solo pase datos concretos
            this.communication.send(JSON.stringify(player), origin);
            this.drawMap();            
        }
    }

    usernameUpdate(name, id) {
        let player = this.players.find(x => x.origin === id);
        player.name = name;
    }

    controlMovement(direction, id){
        let player = this.players.find(x => x.origin === id);
        switch(direction){
            case 'right': 
                if(this.controlPlace(player.playerY, player.playerX++, player)){
                    let index = this.map[player.playerY][player.playerX].players.indexOf(player);
                    this.map[player.playerY][player.playerX].players.splice(index);
                    this.drawMap();
                } 
                break;
            case 'left': 
                if(this.controlPlace(player.playerY, player.playerX--, player)){
                    let index = this.map[player.playerY][player.playerX].players.indexOf(player);
                    this.map[player.playerY][player.playerX].players.splice(index);
                    this.drawMap();
                }
                break;
            case 'up': 
                if(this.controlPlace(player.playerY++, player.playerX, player)){
                    let index = this.map[player.playerY][player.playerX].players.indexOf(player);
                    this.map[player.playerY][player.playerX].players.splice(index);
                    this.drawMap();
                } 
                break;
            case 'down': 
                if(this.controlPlace(player.playerY--, player.playerX, player)){
                    let index = this.map[player.playerY][player.playerX].players.indexOf(player);
                    this.map[player.playerY][player.playerX].players.splice(index);
                    this.drawMap();
                }
                break;
        }
    }

    controlPlace(y,x, player){
        let move = false;
        let clean = document.querySelector('p');
        if(clean) clean.style = "display:none;";
        let text = document.createElement('p');
        if(this.map[y][x].burrow == true && this.map[y][x].players.length != 0){
            text.innerHTML = 'Other player is there';
        }else if(this.map[y][x].burrow == true){
            text.innerHTML = 'You are healing';
            this.map[y][x].players.push(player);
            move = true;
        }
        if(this.map[y][x].players.length != 0){
            text.innerHTML = 'You are in a fight, you migth die';
            this.map[y][x].players.push(player);
            move = true;
        }
        if(this.map[y][x].endPoint == true){
            text.innerHTML = 'You win';
        }
        if(this.map[y][x].endPoint == true && this.map[y][x].burrow == false && this.map[y][x].players.length == 0){
            text.innerHTML = 'Moving';
            this.map[y][x].players.push(player);
            move = true;
        }
        this.container.appendChild(text);
        return move;
    }
}

export { Master };