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
                //Añadida aquí funcion para conseguir nombre
                //Puede que requiera promesa para que no permita que continúe creando cosas
                //Hasta que el usuario esté actualizado
                this.getName();
                //Creo el mapa aquí para asegurarme que los datos han llegado
                this.drawMap();
                //Asigno las teclas y que envien mensaje
                this.tamagotchiMovement();
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

    //Funcion similar a la del maestro para crear mapa pero con nombre
    getName(){
        let form = document.createElement("form");
        this.container.appendChild(form);
        let name = document.createElement("input");
        name.type = 'text';
        name.placeholder = "Username";
        form.appendChild(name);        
        let button = document.createElement("input");
        button.type = "button";
        button.value = "Submit";
        button.addEventListener("click", ()=>{
            let username = name.value;
            if(username.length < 2){
                let text = document.createElement("p");
                text.innerHTML = "Please enter a different username";
                form.appendChild(text);
            }else{
                //TO DO Aquí actualizo el nombre del usuario pero no lo manda al maestro
                //Probablemente requiera un send() y un nuevo caso del maestro para recibir ese tipo
                //de mensaje y tratarlo correctamente
                this.player.name = username                
                form.style.display = "none";
                console.log(this.player)
            }
        });
        form.appendChild(button);
    }

    tamagotchiMovement() {
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                //cambiar los sends por mensajes correctamente seteados.
                case "ArrowRight":
                    console.log("derecha");
                    const message = {
                        type : '0',
                        valor : "MoveTama",
                        direction : "right"
                    }
                    this.comunication.send(JSON.stringify(message), this.id);
                    break;

                case "ArrowLeft":
                    console.log("izquierda");
                    //this.comunication.send("asdf", "asdf");

                    break;

                case "ArrowDown":
                    console.log("abajo");
                    //this.comunication.send("asdf", "asdf");

                    break;

                case "ArrowUp":
                    console.log("ARRIBA");
                    //this.comunication.send("asdf", "asdf");

                    break;
            }
        })
    }
}



export {Client};