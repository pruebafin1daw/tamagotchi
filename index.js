import { Communication } from "./communication/communication.js";
import { game } from "./game/game.js";

let mainDiv = 'mainDiv';

//Crea comunicaciones
let control = null;
let communication = new Communication();
communication.init({
    ip: "localhost",
    port: "8023",
    check: eval(checkMaster),
});

//Comprueba si el usuario es master
function checkMaster(id) {
    if(communication.master){
        control = new game.Master();

        //Aquí iría una función asíncrona que debería crear un formulario con la función
        //de abajo y esperar a que se haga submit para recorger los datos y empezar la partida

        control.init(mainDiv, {
            width: 15,
            height: 15,
            difficulty: 1
        }, communication);
    } else {
        control = new game.Client();
        control.init(mainDiv, communication, id);
    }    
}

function showAdminConfigIU() {
    let form = new FormUI();
    form.init({
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