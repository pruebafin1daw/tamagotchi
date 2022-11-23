class Game{
    init(config){
        this.map=[
            [
                [1,2,3],
                [4,5,6],
            ] 
        ]  
        this.tipo=[];     
    }
    addEntity(){
        this.map[0][0][0]=tipo;
    }
    drawBoard(){
        let mapa=this.map[0];
        for (let i = 0; i < mapa.length; i++) {
            for (let j = 0; j < mapa[i].length; j++) {
            console.log(mapa);  
            }
        }
    }
}

export {Game};