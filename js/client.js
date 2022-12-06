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

    updatePos(content) {
        this.x = content.x;
        this.y = content.y;
    }

    showMap(content) {
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
                }else if(i == this.y && j == this.x) {
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

    //increases energy when player is stationary
    refreshLife(content) {
        this.energy = content.energy;
        let energy = document.getElementById("health");
        energy.removeChild(energy.firstChild);
        let energyValue = document.createElement('h2');
        energyValue.innerHTML = this.energy;
        energy.appendChild(energyValue);
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
    }

    occupiedBurrow(content){
        let occupied = document.createElement('h4');
        occupied.innerHTML = "Occupied burrow";
        let info = document.getElementById("info");
        info.appendChild(occupied);
    }

    battle(content){
        let fight = document.createElement('h4');
        fight.innerHTML = "You are in a battle, you might die";
        let info = document.getElementById("info");
        info.appendChild(fight);
    }
}

export {Client};