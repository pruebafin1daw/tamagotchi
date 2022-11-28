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

    init(mainDiv, terminate) {
        //Ejecuta la función showAdminConfigIU para que el administrador configure la partida
        this.showAdminConfigIU(mainDiv);
    }

    showAdminConfigIU(mainDiv) {
        let form = new FormUI();
        form.init({
            id: "FormAdmin",
            name: "Formulario de Administrador",
            desc: "Introduce los datos que quieras para la partida",
            container: mainDiv,
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

    crearMapa(data) {
        this.config = JSON.parse(JSON.stringify(Object.fromEntries(data)));
        console.log(this.config)

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
            let layer = new Array(x);
            for (let j = 0; j < y; j ++) {
                if(i == centerX && j == centerY) {
                    //Si los indices son los de la meta mete la casilla meta en la posición
                    layer[i][j] = meta;
                }else{
                    //Crea una casillas de un tipo random entre 0 y 1 (Vacia o descanso)
                    //TODO: Hacer que el master pase también la cantidad de áreas de descanso.
                    layer[i][j] = new game.Cell(i, j, Math.round(Math.random()));
                }
            } 
        }

        console.log(this.map);
    }

    showGame() {

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