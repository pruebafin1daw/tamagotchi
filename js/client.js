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

    showMap(content) {
        let div = document.getElementById("map");
        while(div.firstChild) {
            div.removeChild(div.firstChild);
        }
        for(let i=0; i<this.width; i++) {
            for(let j=0; j<this.height; j++) {
                let space = document.createElement('div');
                if (i == Math.floor(this.width/2) && j == Math.floor(this.height/2)){
                    space.setAttribute("class", "goal");            //goal class for the goal
                }else if(i == this.x && j == this.y) {
                    space.setAttribute("class" , "player");         //player class for the client
                }else{
                    space.setAttribute("class" , "space");          //space clase for empty boxes
                };
                burrow.forEach(element => {
                    if(i == element.x && j == element.y){
                        space.setAttribute("class" , "burrow");     //burrow class for each burrow
                    }
                });
                div.appendChild(space);
            }
            div.appendChild(document.createElement('br'));
        }
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
        
    //Clear the screen and show a message when player lose
    deadPlayer(content) {
        let body = document.getElementsByName('body');
        let title = document.createElement('h1');
        while (body.firstChild) {
            body.removeChild(body.firstChild);
        }
        title.innerHTML = "YOU DIED";
        body.appendChild(title);
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

    winnerPlayer(content){
        this.updatePos(content);
        let body = document.getElementsByName('body');
        let title = document.createElement('h1');
        while (body.firstChild) {
            body.removeChild(body.firstChild);
        }
        title.innerHTML = "YOU WIN";
        body.appendChild(title);
    }

    updatePos(content) {
        this.x = content.x;
        this.y = content.y;
        this.showMap(content);
    }

    occupiedBurrow(content){
        let occupied = document.createElement('h4');
        occupied.innerHTML = "Occupied burrow";
        let info = document.getElementById("info");
        info.appendChild(occupied);
    }

    battle(content){
        this.updatePos(content);
        let fight = document.createElement('h4');
        fight.innerHTML = "You are in a battle, you might die";
        let info = document.getElementById("info");
        info.appendChild(fight);
    }
}

export {Client};