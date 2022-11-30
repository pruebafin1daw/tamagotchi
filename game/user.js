import { FormUI } from "../FormUI/formUI.js";

var game = game || {};

game.VACIA = 0;
game.REST = 1;
game.FLAG = 2;

game.Client = class {
    active = false;
    map = null;

    init(mainDiv, communication, id) {
        this.id = id;
        this.communication = communication;
        this.communication.handler = this;
        this.comunication.send("nuevo", this.comunication.MASTER);
    }

    newMsg(msg, origin) {
        console.log(msg);
    }
}

game.Master = class {
    config = null;
    users = null;
    map = null;
    mainDiv = null;
    clientMap = null;

    init(mainDiv, config, communication) {
        this.mainDiv = mainDiv;

        this.communication = communication;
        this.communication.handler = this;

        this.players = [];
        this.map = new Array();
        this.edges = [];

        this.map = createMap();

        let clientMap = {

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

        this.communication.send();

        //this.showAdminConfigIU(mainDiv);

    }

    createMap() {
        for (let i = 0; i < config.height; i++) {

            this.map[i] = new Array();

            for (let j = 0; j < config.width; j++) {

                this.map[i][j] = new game.Cell(j, i, false, [], false, null);

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
        switch(msg.valor) {
            case 'nuevo':
                this.newPlayer(origin);
                break;
        }
    }

    newPlayer(origin) {
        //Si el jugador no existe lo crea
        if(!this.players.find(x => origin.x === origin)) {
            let player = new game.Player(origin, '', 0, 0, true, 100);

            let index = Math.floor(Math.random() * this.edges.length);
            let cell = this.edges.splice(index, 1);
            cell.burrowPlayer = player;
            player.x = cell.x;
            player.y = cell.y;
            this.players.push(player);
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
    
    /*
    * @X Eje x
    * @Y Eje y
    * @Contenido ( 0 => Casilla Vacia, 1 => Area Descanso, 3 => Bandera Final)
    */
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