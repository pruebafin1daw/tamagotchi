class Master{
    constructor(){
        this.size = null;
        this.players = null;
        this.table = [[]];
    }

    init(){
        let container = document.getElementById("container");
        let form = document.createElement("form");
        container.appendChild(form);
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

    }

}

export {Master};