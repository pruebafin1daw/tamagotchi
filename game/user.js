import { FormUI } from "../FormUI/formUI.js";

var game = game || {};

game.VACIA = 0;
game.REST = 1;
game.FLAG = 2;

game.Client = class {
    init() {
        this.cell = new game.Cell();
    }

    showUserConfigIU() {

    }

    showUserGame() {

    }
}

game.Master = class {
    config = null;
    users = null;
    map = null;
    mainDiv = null;

    init(mainDiv, terminate) {
        this.mainDiv = mainDiv;

        //Ejecuta la función showAdminConfigIU para que el administrador configure la partida
        this.showAdminConfigIU(mainDiv);
    }

    showAdminConfigIU() {
        let form = new FormUI();
        form.init({
            id: "FormAdmin",
            name: "Formulario de Administrador",
            desc: "Introduce los datos que quieras para la partida",
            container: this.mainDiv,
            action: this.crearMapa,
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

    }

    //Esta función se va a ejecutar de manera asíncrona por lo que no puede acceder a los datos de la clase
    crearMapa(data) {
        /*
            Me gustaría porder devolver esto para que la clase siempre 
            Tenga los datos
            this.config = JSON.parse(JSON.stringify(Object.fromEntries(data)));
        */
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

}

game.Cell = class {
    
    /*
    * @X Eje x
    * @Y Eje y
    * @Contenido ( 0 => Casilla Vacia, 1 => Area Descanso, 3 => Bandera Final)
    */
    constructor(x, y, contenido) {
        this.x = x;
        this.y = y;
        this.contenido = contenido;
    }
}

export { game };