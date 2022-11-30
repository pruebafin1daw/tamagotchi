import {Casilla} from "../Casilla/casilla.js";
import {Jugador} from "../Jugador/jugador.js";
import {Madriguera} from "../Madriguera/madriguera.js";
export {Master}
class Master {
    nCasillas;
    casillaCentral=null;
    tablero=[];
    init() {  
        
    }
    establecerTablero(nCasillas) {
        if(nCasillas%2==0) nCasillas=nCasillas+1;
        this.nCasillas=nCasillas;
        this.casillaCentral= Math.trunc((nCasillas/2)+1);
        for(let i=0;i<nCasillas;i++) {
            let array= [];
            this.tablero.push(array);
            for(let j=0;j<nCasillas;j++) {
                let casilla= new Casilla();
                this.tablero[i][j]=casilla;
            }
        }
    }
    generarMadriguera() {
        let posX = Math.floor(Math.random() * this.nCasillas);
        let posY = Math.floor(Math.random() * this.nCasillas);
        let m = new Madriguera(posX,posY)
        this.tablero[posX][posY] = m;
    }
    insertarJugador(jugador) {
        
    }
    comrobarposicion(jugador) {
    
    }
}

