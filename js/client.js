import {Communication} from "./communication.js";

class Client {
    active = false;
    map = null;
    
    init(comunication, id) {
        this.id = id;
        this.comunication = comunication;
        this.comunication.handler = this;
        this.comunication.send("newPlayer",id);
    }

    newMsg(msg,origin) {
        this.eval(msg.valor(origin));
    }

    deadClien(origin){
        //origin.name is the dead client name send by master
        let textfile = document.getElementById("clients");
        let clientName = document.createElement('h4');
        clientName.innerHTML = origin.name + " ha muerto";
        textfile.appendChild(clientName);

        const myTimeout = setTimeout(clearName, 5000);

        function clearName() {
            textfile.removeChild(textfile.firstElementChild);
        }

    }

    //add to document lister to send a message when the client push any arrow
    movePlayer(){
        document.addEventListener("keyup", (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    this.comunication.send("movePlayer", this.id, "left");
                break;
                case "ArrowRight":
                    this.comunication.send("movePlayer", this.id, "right");
                break;
                case "ArrowUp":
                    this.comunication.send("movePlayer", this.id, "up");
                break;
                case "ArrowDown":
                    this.comunication.send("movePlayer", this.id, "down");
                break;
            }
        });
    }

    //Function to catch master move info
    foo(movement){
        if(movement.confirm == true){
            this.refreshMap(movement);
        }
    }

    //Refresh the map to show the movement
    refreshMap(movement){
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                
                
            }
            
        }
    }

    //Function for draw game map
    showMap(mapInfo){
        //Height and width are equals because the map is square
        let size = mapInfo.width;
        //let height = mapInfo.height;

        //burrow is an array, it has all burrow positions
        let burrow = mapInfo.burrow;

        //Position is an array that the master send us where the player is
        let position = mapInfo.player;

        let div = document.getElementById("map");
        map = [];
        let goal = Math.trunc(size / 2);


        for (let i = 0; i < size; i++) {
            map.push([]);
            for (let j = 0; j < size; j++) {
                let space = document.createElement('div');
                if (i == goal && j == goal){
                    space.setAttribute("class", "goal");            //goal class for the goal
                }else if(i == position[0] && j == position[1]){
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
















}

export {Client};