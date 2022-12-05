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

        this.movementId = null;
        this.setMovement(this);
    }

    removeMovement(){
        document.removeEventListener('keydown', this.movementId)
        this.movementId = null;
    }

    setMovement() {
        //Mensaje que manda al master 
        if(this.movementId == null){
            this.movementId = this.movement.bind(this);
            document.addEventListener('keydown', this.movementId);
        }
    }

    movement(event){
        const msg = {
            type: 'move',
            playerId: this.id
        }
        
        switch(event.code){
            case "ArrowUp":
                msg.direction = 'up';                
                this.communication.send(msg, 0);
            break;

            case "ArrowRight":
                msg.direction = 'right';
                this.communication.send(msg, 0);
            break;

            case "ArrowDown":
                msg.direction = 'down';
                this.communication.send(msg, 0);
            break;

            case "ArrowLeft":
                msg.direction = 'left';
                this.communication.send(msg, 0);
            break;

            case "Space":
                msg.direction = "in-out";
                this.communication.send(msg, 0);
            break;
        }
    }

    newMsg(msg, origin) {

        //Si esta peleando le quitamos el movimiento
        if(msg.valor.fight){
            this.removeMovement();
        }else if(msg.valor.fight == false){
            this.setMovement();
        }

        if(msg.valor.dead){
            this.communication.socket.close();
        }
        
        //Si nos llegan el mapa y el jugador, los asigna y dibuja el mapa
        if(msg.valor.map && msg.valor.player){
            this.map = msg.valor.map;
            this.player = msg.valor.player;
            this.drawMap();
            this.drawUI();
        }

        //Si nos llega un jugador esque se va a mover
        if(msg.valor.jugador) {
            let jugador = msg.valor.jugador;

            let maxHeight = this.map.height - 1;
            let maxWidth = this.map.width - 1;


            //Si las posiciones del jugador son distintas a las del nuestro
            if(this.player.x != jugador.x || this.player.y != jugador.y && jugador.x <= maxHeight || jugador.y <= maxWidth){
                //Asignamos las nuevas posiciones
                this.player.x = jugador.x;
                this.player.y = jugador.y;

                //Editamos el HTML
                let previousCell = document.querySelector('.player');
                previousCell.classList.toggle('player');
    
                //Cogemos el div para introducir la clase en la nueva posición
                let div = document.querySelector(`.${this.mainDiv}`);
                let table = div.childNodes[1];
                table.childNodes[this.player.x].childNodes[this.player.y].classList.toggle('player');   
            }
        }

        //Si nos llega un burrow esque va a salir o a entrar
        if(msg.valor.burrow != null && msg.valor.burrow != undefined) {
            let divBurrow = document.querySelector('.madriguera');
            divBurrow.textContent = msg.valor.burrow  ? 'Estas en una madriguera' : 'No estas en una madriguera';
        }
    }

    //Dibuja el mapa en la interfaz
    drawMap() {
        let table = document.createElement('table');
        for(let x = 0; x < this.map.width; x++){
            let row = document.createElement('tr');
            for(let y = 0; y < this.map.height; y++){
                let endPointX = Math.floor(this.map.width % 2);
                let endPointY = Math.floor(this.map.height % 2);
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

    //Dibuja la interfaz de usuario
    drawUI() {

        //Contenedor Interfaz
        let container = document.createElement('div');
        container.classList.toggle('interfaz');
        container.style.display = "flex";

        //TODO => Loger que saque mensajes a los usuarios
        //TODO => Energía del usuario

        
        //Madriguera
        let texto = document.createElement('h1');
        texto.textContent = "Estas en una madriguera";
        texto.classList.toggle('madriguera');

        container.appendChild(texto);
        document.querySelector(`.${this.mainDiv}`).parentElement.append(container);
    }

    /*
        Esta función va a actualizar la interfaz, se ejectará cada X segundos y tendrá que actualizar
        los valores que se han puesto arriba con los datos recibidos por el Master
    */
    updateUI(msg) {


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
        this.activeFights = [];

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

        this.createInterval();
    }

    //Intervalo que recorre la lista de jugadores y les manda actualizaciones de estado como energía o jugadores
    createInterval() {
        setInterval( () => {
            this.players.forEach( player => {
                this.communication.send({
                    energy: player.energy,
                    players: this.players.length
                }, 1, player.origin.id);
            });
        }, 1000);
    }

    createMap(config) {
        for (let i = 0; i < config.height; i++) {

            this.map[i] = new Array();

            for (let j = 0; j < config.width; j++) {

                this.map[i][j] = new game.Cell(i, j, false, [], false, null);

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
    
    //Función que genera un formulario para el admin
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

    //Función que guarda el formulario del admin
    saveAdminConfig() {

    }

    //Para imprimir la información del admin
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

        div.innerHTML = "";
        div.appendChild(tabla);
    }

    //Función para ejecutar los mensajes que nos llegan de communication
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

    //Función que mueve al jugador
    movePlayer(msg, origin) {
        let jugador = this.players.find(x => x.origin.id === msg.valor.playerId);

        //Si existe el jugador y no está en una madriguera
        if(jugador && !jugador.inBurrow){

            let moved = false;
            let originalX = jugador.x;
            let originalY = jugador.y;
            switch(msg.valor.direction) {
                case "up":
                    if(jugador.x > 0 && !(this.map[jugador.x - 1][jugador.y].burrow && this.map[jugador.x - 1][jugador.y].players.length > 0)){
                        jugador.x--; 
                        moved = true;
                    }
                break;

                case "down":
                    if(jugador.x < this.clientMap.height - 1 && !(this.map[jugador.x + 1][jugador.y].burrow && this.map[jugador.x + 1][jugador.y].players.length > 0)){
                        jugador.x++;
                        moved = true;
                    }
                break;

                case "right":
                    if(jugador.y < this.clientMap.width - 1 && !(this.map[jugador.x][jugador.y + 1].burrow && this.map[jugador.x ][jugador.y + 1].players.length > 0)){
                        jugador.y++;
                        moved = true;
                    }
                break;

                case "left":
                    if(jugador.y > 0 && !(this.map[jugador.x][jugador.y - 1].burrow && this.map[jugador.x][jugador.y - 1].players.length > 0)){
                        jugador.y--;
                        moved = true;
                    }
                break;
            }

            if(moved){
                let dead = jugador.spendEnergy(10);
                if(dead){
                    // AQUI PABLO ENVIA MENSAJE DE CUANDO MUERE
                    this.communication.send({
                        dead: true
                    }, 1, jugador.origin.id);
                }
            }

            //Si los valores originales no han cambiado es porque no se ha movido
            if(originalX != jugador.x || originalY != jugador.y){
                this.map[originalX][originalY].players.pop(jugador);
                this.map[jugador.x][jugador.y].players.push(jugador);

                //Batalla del cliente
                if(this.map[jugador.x][jugador.y].players.length > 1) {
                    console.log("Fight!");
                    this.handleFight(jugador);
                }

                //Manda al jugador su nueva configuración
                this.communication.send({
                    jugador: jugador,
                }, 1, jugador.origin.id);
            }
        }

        if(jugador && msg.valor.direction == "in-out") {
            let cell = this.map.flat().find(cell => cell.x == jugador.x && cell.y == jugador.y);
            this.handleBurrow(cell, jugador);
        }
    }

    handleFight(jugador){
        let cell = this.map[jugador.x][jugador.y];
        let fight = this.activeFights.find(element => element.cell == cell);
        if(!fight){
            fight = {
                cell: this.map[jugador.x][jugador.y],
                players: [...cell.players],
                action: null
            }
            this.activeFights.push(fight);
            this.activateFight(fight);
        }else{
            fight.players.push(jugador);
        }

        for (const player of cell.players) {
            this.communication.send({
                fight: true
            }, 1, player.origin.id);
        }
    }

    activateFight(fight){
        // AQUI EMPIEZA LA BATALLA
        fight.action = setInterval(() => this.fightAction(fight), 300);
    }

    fightAction(fight){
        let escape = Math.random();
        let extraDamage = 0;
        for (const player of fight.players) {
            escape = escape - (player.energy / 1000);
            extraDamage = player.energy / 100;
            if(escape < 0.10){
                fight.players.splice(fight.players.indexOf(player), 1);
            }

            let dead = player.spendEnergy(10 + extraDamage);
            if(dead){
                // AQUI MUERE ALGUIEN
                fight.players.splice(fight.players.indexOf(player), 1);
                if(dead){
                    // AQUI PABLO ENVIA MENSAJE DE CUANDO MUERE
                    this.communication.send({
                        dead: true
                    }, 1, player.origin.id);
                }
            }
        }
        if(fight.players.length <= 1){
            // AQUI ACABA LA BATALLA
            this.endfight(fight);
        }
    }

    endfight(fight){
        clearInterval(fight.action);
        this.activeFights.splice(this.activeFights.indexOf(fight), 1);
        for (const player of fight.cell.players) {
            this.communication.send({
                fight: false
            }, 1, player.origin.id);
        }
        console.log(this.players);
    }

    handleBurrow(cell, player) {
        let inBurrow = false;
        if(cell && cell.burrow){
            if(cell.burrowPlayer == null) {
                
                cell.burrowPlayer = player;
                player.inBurrow = true;
                inBurrow = true;
            }
            
            else if(cell.burrowPlayer == player) {
                cell.burrowPlayer = null;
                player.inBurrow = false;
            }

        }

        const burrowMsg = {
            burrow: inBurrow,
        }

        this.communication.send(burrowMsg, 2, player.id);
    }

    //Función que crea un jugador nuevo
    newPlayer(origin) {
        //Si el jugador no existe lo crea
        if(!this.players.find(player => player.origin === origin)) {
            //Crea el jugador y le asigna una posicion
            let player = new game.Player(origin, '', 0, 0, true, 100);
            let index = Math.floor(Math.random() * this.edges.length);
            let cell = this.edges.splice(index, 1);
            cell = cell[0];

            cell.players.push(player);
            cell.burrowPlayer = player;
            player.x = cell.x;
            player.y = cell.y;

            this.players.push(player);

            this.communication.send({
                map: this.clientMap,
                player: player
            }, 1, origin.id);
        }
    }

}

//Clase jugador
game.Player = class {
    constructor(origin, id, x, y, inBurrow, energy) {
        this.origin = origin;
        this.id = id;
        this.x = x;
        this.y = y;
        this.inBurrow = inBurrow;
        this.energy = energy;
    }

    spendEnergy(quantity){
        this.energy -= quantity;
        if(this.energy < 0){
            this.energy = 0;
            return true;
        }
        return false;
    }
}

//Clase Celda
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