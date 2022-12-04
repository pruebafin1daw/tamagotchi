import {Communication} from "./communication.js";

class Client {
    active = false;
    map = null;
    container = document.getElementById('container');
    init(comunication) {
        this.comunication = comunication;
        this.comunication.handler = this;
        //TO DO Conseguir nombre de jugador
        this.comunication.send("Datos hacia master",Communication.MASTER);
        //TO DO Ahi va mensaje hacia todos de nueva conexion
        this.comunication.send("nuevo",Communication.ALL); 
        //Variable con los datos del jugador                               
        this.player = "";
    }
    // Funcion llamada en default case en communication al llegar un mensaje nuevo
    newMsg(msg,origin) {
        switch (msg.valor) {
            case "nuevo":
                console.log("Nuevo usuario conectado")
                break;
            //Aquí recibe los datos del jugador mandado por maestro
            //A tratar como veamos conveniente, solo estoy mostrando el id
            default:
                let player = JSON.parse(msg.valor);
                console.log(player);
                //Guardo todos los datos del jugador en esta variable
                this.player = player;
                //Creo el mapa aquí para asegurarme que los datos han llegado
                this.drawMap();
                break;
        }        
        console.log("This was a client message");
    }

    drawMap(){
        let burrows = this.player.map;
        let size = burrows[0].size;
        let finish = size / 2 - 0.5;
        let cont = 0;
        let table = document.createElement('table');
        for (let i = 0; i < size; i++) {
            let row = document.createElement('td');
            for (let j = 0; j < size; j++) {
                let cell = document.createElement('tr');
                if(cont < burrows.length){
                    if(burrows[cont].y == i && burrows[cont].x == j){
                        cell.innerHTML = 'M ';
                        cont++
                    }else{
                        cell.innerHTML = '0 ';
                    }
                }else{
                    cell.innerHTML = '0 ';
                }
                if(i == finish && j == finish){
                    cell.innerHTML = 'F ';
                }
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        this.container.appendChild(table);
    }
}

export {Client};