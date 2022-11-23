//var tamagotchi = tamagotchi || {};

tamagotchi.CASILLA = 0;
tamagotchi.HOLE = 1;
tamagotchi.PLAYER = 50;
tamagotchi.FINISH = 100;

tamagotchi.Master = class {
    constructor(){
        this.size = null;
        this.players = null;
        this.table = [[]];
        this.container = document.getElementById("container");
    }

    init(){
        this.container = document.getElementById("container");
        let form = document.createElement("form");
        this.container.appendChild(form);
        let map = document.createElement("input");
        map.type = 'text';
        map.placeholder = "Size of map";
        form.appendChild(map);
        let players = document.createElement("input");
        players.type = 'text';
        players.placeholder = "Players";
        form.appendChild(players);
        let button = document.createElement("input");
        button.type = "button";
        button.value = "Submit";
        button.addEventListener("click", ()=>{
            let mapSize = map.value;
            if(mapSize % 2 == 0){
                let text = document.createElement("p");
                text.innerHTML = "Write an odd number";
                form.appendChild(text);
            }else{
                this.size = map.value;
                this.players = players.value;
                form.style.display = "none";
                drawTable();
            }
            
            
        });
        form.appendChild(button);
    }

    drawTable(){
        let finish = this.size / 2 + 0.5;
        for (let i = 0; i < this.size; i++) {
           for (let j = 0; j < this.size; j++) {
            if (i == finish && j == finish) {
                this.table.push(new tamagotchi.Object(tamagotchi.FINISH));
            }else{
                this.table.push(new tamagotchi.Object(tamagotchi.CASILLA));
            }
           }
        }
        this.container.innerHTML = this.table;
    }

}

export {Master};