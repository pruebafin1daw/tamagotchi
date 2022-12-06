class Client {
    
    init(id, comunication) {
        this.id = id;
        this.comunication = comunication;
        this.comunication.handler = this;
        let object = {
            id : id,
            funct : "newPlayer"
        } 
        this.comunication.send(0, object);
    }

    newMsg(content) {
        this.eval(content.funct(content));
    }

    initClient(content) {
        this.x = content.x;
        this.y = content.y;
        this.width = content.map.width;
        this.height = content.map.height;
        this.burrows = content.map.burrows;
        this.energy = 100;
    }

    //add to document lister to send a message when the client push any arrow
    movePlayer(content) {
        document.addEventListener("keyup", (e) => {
            let object = {
                id : this.id,
                funct : "movePlayer"
            }
            switch(e.key) {
                case "ArrowLeft":
                    object.movement = "left";
                    this.comunication.send(0, object);
                break;
                case "ArrowRight":
                    object.movement = "right";
                    this.comunication.send(0, object);
                    break;
                case "ArrowUp":
                    object.movement = "up";
                    this.comunication.send(0, object);
                    break;
                case "ArrowDown":
                    object.movement = "down";
                    this.comunication.send(0, object);
                    break;
            }
        });
    }

    //increases energy when player is stationary
    refreshLife(content) {
        this.energy = content.energy;
        let energy = document.getElementById("health");
        energy.removeChild(energy.firstChild);
        let energyValue = document.createElement('h2');
        energyValue.innerHTML = this.energy;
        energy.appendChild(energyValue);
    }

    //Refresh the map to show the movement
    refreshMap(content) {
        let div = document.getElementById("map");
        while(div.firstChild) {
            div.removeChild(div.firstChild);
        }
        let map = [];
        
        for(let i=0; i<this.width; i++) {
            map.push([]);
            for(let j=0; j<this.height; j++) {
                let space = document.createElement('div');
                if (i == this.width/2 && j == this.height/2){
                    space.setAttribute("class", "goal");            //goal class for the goal
                }else if(i == content.y && j == content.x) {
                    space.setAttribute("class" , "player");         //player class for the client
                    space.setAttribute("id" , "player");
                }else{
                    space.setAttribute("class" , "space");          //space clase for empty boxes
                };
                burrow.forEach(element => {
                    if(i == element.y && j == element.x){
                        space.setAttribute("class" , "burrow");     //burrow class for each burrow
                    }
                });
                div.appendChild(space);
            }
            div.appendChild(document.createElement('br'));
        }
    }
        
    //Clear the screen and show a message when player lose
    deadPlayer() {
        let body = document.getElementsByName('body');
        let title = document.createElement('h1');
        while (body.firstChild) {
            body.removeChild(body.firstChild);
        }
        title.innerHTML = "YOU DIED";
        body.appendChild(title);
        document.removeEventListener("keyup", (e) );                //Revisar esto si hay errores
    }

    //---------ESTA PARTE NO ME GUSTA, HAY CAMBIARLA ES EL MISMO CÓDIGO CON FUNCIONES DE DIFERENTE NOMBRE-------------------
    info = document.getElementById("info");
    // occupiedBurrow(content){
    //     let occupied = document.createElement('h4');
    //     occupied.innerHTML = "Occupied burrow";
    //     info.appendChild(occupied);

    //     const myTimeout = setTimeout(clearOccupied, 3000);

    //     function clearOccupied() {
    //         info.removeChild(info.firstElementChild);
    //     }
    // }

    // battle(content){
    //     let fight = document.createElement('h4');
    //     fight.innerHTML = "You are in a battle, you might die";
    //     info.appendChild(fight);

    //     const myTimeout = setTimeout(clearFight, 3000);

    //     function clearFight() {
    //         info.removeChild(info.firstElementChild);
    //     }
    // }

    //AHORA MUCHO MEJOR, la funcion se llama actions y le tenemos que pasar action : occupiedBurrow y si no le pasamos nada
    //estaría en un batalla
    actions(content) {
        let playerAction = document.createElement('h4');
        if(content.action == "occupiedBurrow") {
            playerAction.innerHTML = "Occupied burrow";
            info.appendChild(playerAction);
        }else {
            playerAction.innerHTML = "You are in a battle, you might die";
            info.appendChild(playerAction);
        }
        const myTimeout = setTimeout(clearAction, 3000);

        function clearAction() {
            info.removeChild(info.firstElementChild);
        }
    }

    //text file on screen that show when someone sole
    deadClients(content) {
        //content.name is the dead client name send by master
        let textfile = document.getElementById("clients");
        let clientName = document.createElement('h4');
        clientName.innerHTML = content.name + " has died";
        textfile.appendChild(clientName);

        const myTimeout = setTimeout(clearName, 8000);

        function clearName() {
            textfile.removeChild(textfile.firstElementChild);
        }
    }
}

export {Client};