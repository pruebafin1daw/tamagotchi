class Game{
    constructor(){
        this.map=[
            [
                [1,2,3],
                [4,5,6],
            ] 
        ]  
        this.tipo=[];     
    }
    createMap(){
        this.map2 = [];
        for(let i = 0; i < 17; i++){
            for(let j = 0; j < 17; j++){
                this.map2[j] = 'X';
                this.map[i] = this.map2[j];
            }
        }
    }
    drawBoard(){
        let vista = document.getElementById("board");
        let mapa = this.map;
        for(let i = 0; i < mapa.length; i++){
            for(let j = 0; j < mapa.length; j++){
                if(i == 8 && j == 8){
                    vista.innerHTML += "<div class="+'end'+"></div>";
                }else{
                    vista.innerHTML += "<div class="+'cube'+"></div>";
                }

            }
            vista.innerHTML += "<br/>";
        }
    }
    addPlayer(players){
        let player = null;
        if(players){
            player = new Player(0, 0, players);
            this.map[0][0] = players;
         }
    }
}

export {Game};