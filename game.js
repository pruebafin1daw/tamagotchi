class Game{
    init(){
        this.map=[
            [1,2,3
            ] 
        ]    
    }
    crearMapa(){
        for(let i = 0; i < 15; i++){
            for(let j = 0; j < 15; j++){
                this.map[j] = "X";
                this.map[i] =this.map[j];
            }
        }       
    }
    drawBoard(){
        let saw=document.getElementById("board");
        let mapa=this.map[0];
        for (let i = 0; i < mapa.length; i++) {
            for (let j = 0; j < mapa[i].length; j++) {
            saw.innerHTML +=mapa;  
            }
            saw.innerHTML +="<br>";
        }
    }
}
export {Game};