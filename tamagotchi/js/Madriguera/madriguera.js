export{Madriguera};
class Madriguera {
    posicionX;
    posicionY;
    idJugadores=[];
    constructor(x,y) {
        this.posicionX=x;
        this.posicionY=y;
    }
    setPosicion(x,y) {
        this.posicionX=x;
        this.posicionY=y;
    }
}
