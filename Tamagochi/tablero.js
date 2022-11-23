class Tablero{
    constructor(){
        this.map = [];
    }
    
    crearMapa(){
        for(let i = 0; i < 20; i++){
            for(let j = 0; j < 20; j++){
                this.map[j] = "X";
                this.map[i] =this.map[j];
            }
        }
        
    }

    dibujaMapa(){
        let vista = document.getElementById("mapa");
        let mapa = this.map;
        for(let i = 0; i < mapa.length; i++){
            for(let j = 0; j < mapa[i].length; j++){
                vista.innerHTML += mapa;
            }
            vista.innerHTML += "<br/>"
        }
    }
}

export {Tablero}