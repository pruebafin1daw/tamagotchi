class Tablero{
    constructor(){
        this.map = [];
    }
    
    crearMapa(){
        this.map2 = [];
        for(let i = 0; i < 17; i++){
            for(let j = 0; j < 17; j++){
                this.map2[j] = 'X';
                this.map[i] = this.map2[j];
            }
        }
    }

    dibujaMapa(){
        let vista = document.getElementById("mapa");
        let mapa = this.map;
        for(let i = 0; i < mapa.length; i++){
            for(let j = 0; j < mapa.length; j++){
                if(i == 8 && j == 8){
                    vista.innerHTML += "<div class="+'final'+"></div>";
                }else{
                    vista.innerHTML += "<div class="+'cubo'+"></div>";
                }

            }
            vista.innerHTML += "<br/>";
        }
    }

    añadirJugador(jugador){
        let player = null;
        if(jugador){
            player = new Jugador(0, 0, jugador);
            this.map[0][0] = player;
            // this.entities.push(player);
            // pacman.ENTITY = this.entities[0];
         }
    }
}

export {Tablero}