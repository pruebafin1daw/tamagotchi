import { Object } from "./objects.js";

class Master {
    CASILLA = 0;
    HOLE = 1;
    PLAYER = 50;
    FINISH = 100;
    constructor(){
        this.size = null;
        this.players = null;
        this.board = [];
        this.container = document.getElementById("container");
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
                this.createBoard();
            }
            
            
        });
        form.appendChild(button);
    }

    createBoard(){
        //this. board = this.makeArray(this.size, this.size);
        let finish = this.size / 2 - 0.5;
        let hole = [];
        for (let i = 0; i < this.size; i++) {
            this.board[i] = new Array();
           for (let j = 0; j < this.size; j++) {
            if (i == finish && j == finish) {
                this.board[i].push(new Object(this.FINISH));
            }else{
                this.board[i].push(new Object(this.CASILLA));
            }
           }
        }
        console.log(this.board)
        this.drawBoard();
    }

    drawBoard(){
        let table = document.createElement('table');
        for (let i = 0; i < this.board.length; i++) {
            let row = document.createElement('td');
            for (let j = 0; j < this.board[i].length; j++) {
                let cell = document.createElement('tr');
                switch (this.board[i][j].type) {
                    case this.CASILLA:
                        cell.innerHTML = '0 ';
                        break;
                    case this.HOLE:
                        cell.innerHTML = 'U ';
                        break;
                    case this.FINISH:
                        cell.innerHTML = 'P ';
                        break;
                    default:
                        cell.innerHTML = 'X ';
                        break;
                }
                row.appendChild(cell);
            }
            table.appendChild(row);
         }
        this.container.appendChild(table);
    }
}

export {Master};