
class Master {
    constructor(){
        this.size = null;
        this.players = null;
        this. board = [];
        this.container = document.getElementById("container");
        this.CASILLA = 0;
        this.HOLE = 1;
        this.PLAYER = 50;
        this.FINISH = 100;
        this.init();
    }

    init(){
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
                this.makeBoard();
            }
            
            
        });
        form.appendChild(button);
    }

    makeBoard(){
        //this. board = this.makeArray(this.size, this.size);
        let finish = this.size / 2 - 0.5;
        for (let i = 0; i < this.size; i++) {
            this.board[i] = new Array();
           for (let j = 0; j < this.size; j++) {
            if (i == finish && j == finish) {
                this.board[i].push('P');
            }else{
                this.board[i].push(0);
            }
           }
        }
        console.log(this.board)
        this.drawBoard();
    }

    drawBoard(){
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                this.container.innerHTML += this. board[i][j];
            }
            this.container.innerHTML += '<br>';
         }
    }
}

export {Master};