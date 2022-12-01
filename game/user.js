import { FormUI } from "../FormUI/formUI.js";

var game = game || {};

game.VACIA = 0;
game.REST = 1;
game.FLAG = 2;

game.Client = class {
    active = false;
    map = null;
    player = null;
    fullMap = [];

    init(mainDiv, communication, id) {
        this.mainDiv = mainDiv;
        this.id = id;

        this.communication = communication;
        this.communication.handler = this;
    }

    newMsg(msg, origin) {
        
        //Si nos llegan el mapa y el jugador, los asigna y dibuja el mapa
        if(msg.valor.map && msg.valor.player){
            this.map = msg.valor.map;
            this.player = msg.valor.player;
            this.drawMap();
        }

        //Si nos llega un jugador
        if(msg.valor.jugador) {
            let jugador = msg.valor.jugador;

            let maxHeight = this.map.height - 1;
            let maxWidth = this.map.width - 1;

            //Si las posiciones del jugador son distintas a las del nuestro
            if(this.player.x != jugador.x || this.player.y != jugador.y && jugador.x < maxHeight || jugador.y < maxHeight - 1){
                this.player.x = msg.valor.jugador.x;
                this.player.y = msg.valor.jugador.y;
                
                //Borramos la clase de la posición anterior
                let oldCell = document.querySelector('.player');
                oldCell.classList.toggle('player');
    
                //Cogemos el div para introducir la clase en la nueva posición
                let div = document.querySelector(`.${this.mainDiv}`);
                let table = div.childNodes[1];
                console.log(this.player.x, msg.valor.jugador.x, this.player.y, msg.valor.jugador.y)
                table.childNodes[this.player.x].childNodes[this.player.y].classList.toggle('player');   
            }

            
        }
    }

    drawMap() {
        let table = document.createElement('table');
        for(let x = 0; x < this.map.width; x++){
            let row = document.createElement('tr');
            for(let y = 0; y < this.map.height; y++){
                let endPointX = Math.floor(this.map.width % 2);
                let endPointY = Math.floor(this.map.height % 2);
                console.log(endPointX, endPointY)
                let endPoint = x == endPointX && y == endPointY;

                let burrow = false;

                if(this.map.burrows.find(burrow => burrow.x == x && burrow.y == y)){
                    burrow = true;
                }

                let cell = new game.Cell(x, y, endPoint, [], burrow, false);
                this.fullMap.push(cell);


                let docCell = document.createElement('td');
                if(cell.burrow) {
                   docCell.classList.toggle('burrow'); 
                }

                if(cell.x == this.player.x && cell.y == this.player.y){
                    docCell.classList.toggle('player');
                }

                row.appendChild(docCell);
            }
            table.appendChild(row);
        }
        document.querySelector(`.${this.mainDiv}`).appendChild(table);
    }
}

game.Master = class {

    init(mainDiv, config, communication) {
        this.mainDiv = mainDiv;

        this.communication = communication;
        this.communication.handler = this;

        this.players = [];
        this.map = new Array();
        this.edges = [];

        this.createMap(config);

        this.clientMap = {
            //Dimensiones del mapa
            width: config.width,
            height: config.height,

            //Refugios del mapa
            burrows: this.map.flatMap(num => num).filter(item => item.burrow).map(item => {
                return {
                    y : item.y,
                    x : item.x
                }
            })
        }

        // this.communication.send(clientMap, 1, null);

        //this.showAdminConfigIU(mainDiv);

    }

    createMap(config) {
        for (let i = 0; i < config.height; i++) {

            this.map[i] = new Array();

            for (let j = 0; j < config.width; j++) {

                this.map[i][j] = new game.Cell(j, i, false, [], false, null);

                if ((i==0) || (i==config.height-1) || (j==0) || (j==config.width-1)) {
                    if (( i + j ) % 2) {
                        this.map[i][j].burrow = true;
                        this.edges.push(this.map[i][j]);
                    }
                } else if(Math.random() < config.porcentage){
                    this.map[i][j].burrow = true;
                }
            }
        }  
    }
    
    showAdminConfigIU() {
        this.form = new FormUI();
        this.form.init({
            id: "FormAdmin",
            name: "Formulario de Administrador",
            desc: "Introduce los datos que quieras para la partida",
            container: this.mainDiv,
            action: this.printMap,
            fields: [
                {
                    id: "ejeX",
                    type: "number",
                    max: 50,
                    min: 10,
                    placeholder: "Introduce el ancho del mapa"
                },
                {
                    id: "ejeY",
                    type: "number",
                    max: 50,
                    min: 10,
                    placeholder: "Introduce el alto del mapa"
                },
                {
                    id: "maxPlayers",
                    type: "number",
                    max: 15,
                    min: 2,
                    placeholder: "Introduce la cantidad de jugadores Máxima"
                },
                {
                    id: "submit",
                    type: "submit",
                }
            ]
        });

        this.form.data.addEventListener("change", (target) => {
            console.log("holi")
        })
    }

    saveAdminConfig() {

    }

    printMap() {
        config = JSON.parse(JSON.stringify(Object.fromEntries(data)));

        //Cogemos el ancho y largo del tablero
        let x = +this.config.ejeX;
        let y = +this.config.ejeY;

        //Convertimos los numeros en impares
        if(x % 2 == 0) {
            x ++;
        }
        if(y % 2 == 0) {
            y ++;
        }

        //Calculamos los centros respectivos donde irá la bandera del final
        let centerX = Math.ceil(x/2);
        let centerY = Math.ceil(y/2);

        let meta = new game.Cell(centerX, centerY, game.FLAG);

        this.map = [];

        for(let i = 0; i < x ; i ++) {
            let layer = [];
            for (let j = 0; j < y; j ++) {
                if(i == centerX && j == centerY) {
                    //Si los indices son los de la meta mete la casilla meta en la posición
                    layer.push(meta);
                }else{
                    //Crea una casillas de un tipo random entre 0 y 1 (Vacia o descanso)
                    //TODO: Hacer que el master pase también la cantidad de áreas de descanso.
                    layer.push(new game.Cell(i, j, Math.round(Math.random())));
                }
            } 
            this.map.push(layer);
        }

        /*
            Esta parte de aquí abajo no funciona porque es asíncrona la función por lo que se ejecutaría fuera
            de el bloque de la clase y no podría acceder a sus variables
        */

        let tabla = document.createElement('table');
        for(let arr in this.map) {
            let row = document.createElement('tr');
            for(let index in arr) {
                let cell = document.createElement('td');
                cell.textContent = index
                row.appendChild(cell);
            }
            tabla.appendChild(row);
        }

        let div = document.querySelector(`.${config.container}`);

        console.log(div, this.mainDiv)

        div.innerHTML = "";
        div.appendChild(tabla);
    }

    newMsg(msg, origin) {
        let cadena = msg.valor;

        if(msg.valor.type){
            cadena = msg.valor.type;
        }


        switch(cadena) {
            case 'newClient':
                this.newPlayer(msg, origin);
            break;
            
            case 'disconnected':
                this.players.pop(this.players.find(num => num.origin === origin));
            break;

            case 'move':
                this.movePlayer(msg, origin);
            break;
        }
    }

    movePlayer(msg, origin) {
        if(this.players.find(x => x.origin.id === msg.valor.playerId)){
            let jugador = this.players.find(x => x.origin.id === msg.valor.playerId);

            let originalX = jugador.x;
            let originalY = jugador.y;

            switch(msg.valor.direction) {
                case "up":
                    if(jugador.x > 0) {
                        jugador.x--;
                    }
                break;

                case "down":
                    if(jugador.x < this.clientMap.height - 1) {
                        console.log(jugador.x < this.clientMap.height, jugador.x, this.clientMap.height)
                        jugador.x++;
                    }
                break;

                case "right":
                    if(jugador.y < this.clientMap.width - 1) {
                        jugador.y++;
                    }
                break;

                case "left":
                    if(jugador.y > 0){
                        jugador.y--;
                    }
                break;
            }

            console.log(originalX, jugador.x, originalY, jugador.y)

            if(originalX != jugador.x || originalY != jugador.y){
                this.communication.send({
                    jugador: jugador,
                }, 1, jugador.origin.id);
            }
        }
    }

    newPlayer(origin) {
        //Si el jugador no existe lo crea
        if(!this.players.find(x => x.origin === origin)) {
            let player = new game.Player(origin, '', 0, 0, true, 100);
            let index = Math.floor(Math.random() * this.edges.length);
            let cell = this.edges.splice(index, 1);
            cell.burrowPlayer = player;
            player.x = cell[0].x;
            player.y = cell[0].y;
            console.log(player, cell)
            this.players.push(player);

            this.communication.send({
                map: this.clientMap,
                player: player
            }, 1, origin.id);
        }
    }

}

game.Player = class {
    constructor(origin, id, x, y, inBurrow, energy) {
        this.origin = origin;
        this.id = id;
        this.x = x;
        this.y = y;
        this.inBurrow = inBurrow;
        this.energy = energy;
    }
}

game.Cell = class {
    constructor(x, y, endPoint, players, burrow, burrowPlayer) {
        this.x = x;
        this.y = y;
        this.endPoint = endPoint;
        this.players = players;
        this.burrow = burrow;
        this.burrowPlayer = burrowPlayer;
    }
}

export { game };