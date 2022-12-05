import {Communication} from "./communication.js";

class Client {
    active = false;
    map = null;
    object = null;
    
    init(comunication, id) {
        this.id = id;
        this.comunication = comunication;
        this.comunication.handler = this;
        object = {
            id : id,
            funct : newPlayer
        } 
        this.comunication.send(0, object);
    }

    newMsg(content) {
        this.eval(content.funct(content));
    }

    deadClients(content){
        //content.name is the dead client name send by master
        let textfile = document.getElementById("clients");
        let clientName = document.createElement('h4');
        clientName.innerHTML = content.name + " ha muerto";
        textfile.appendChild(clientName);

        const myTimeout = setTimeout(clearName, 8000);

        function clearName() {
            textfile.removeChild(textfile.firstElementChild);
        }

    }

    //add to document lister to send a message when the client push any arrow
    movePlayer(){
        document.addEventListener("keyup", (e) => {
            object = {
                id : this.id,
                funct : movePlayer
            }
            switch (e.key) {
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


    size = null;
    burrow = null;
    goal = null
    //Function for draw game map at start of game
    showMap(content){
        size = content.width;                               //Height and width are equals because the map is square
        burrow = content.burrow;                            //burrow is an array, it has all burrow positions
        goal = Math.trunc(size / 2);
        object = {
            energy : content.energy,
            x : content.x,
            y : content.y
        }
        this.refreshMap(object);
    }
    //Refresh the map to show the movement
    refreshMap(content){
        let energy = document.getElementById("health");
        let div = document.getElementById("map");
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        while (energy.firstChild) {
            energy.removeChild(div.firstChild);
        }

        let energyValue = document.createElement('h2');
        energyValue.innerHTML = content.energy;
        energy.appendChild(energyValue);
        map = [];
        
        for (let i = 0; i < size; i++) {
            map.push([]);
            for (let j = 0; j < size; j++) {
                let space = document.createElement('div');
                if (i == goal && j == goal){
                    space.setAttribute("class", "goal");            //goal class for the goal
                }else if(i == content.y && j == content.x){
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
        
    
    deadPlayer(){
        let body = document.getElementsByName('body');
        let title = document.createElement('h1');
        while (body.firstChild) {
            body.removeChild(body.firstChild);
        }
        title.innerHTML = "YOU DIED";
        body.appendChild(title);
        document.removeEventListener("keyup", (e) );                //Check this id errors
    }

    occupiedBurrow(){
        
    }

    battle(){

    }












}

export {Client};