import { FormUI } from "../FormUI/formUI.js";

var juego = juego || {};

juego.VACIA = 0;
juego.REST = 1;
juego.FLAG = 2;

juego.Client = class {
    init() {
        this.cell = new juego.Cell();
    }

    showUserConfigIU() {

    }

    showUserGame() {

    }
}

juego.Master = class {
    config = null;
    users = null;
    cells = null;

    init(mainDiv, terminate) {

        //Ejecuta la función showAdminConfigIU para que el administrador configure la partida
        this.showAdminConfigIU(mainDiv);

        //Monta la interfaz

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
        this.config = JSON.stringify(Object.fromEntries(data));
    }

    showGame() {

    }

}


export { juego };