class Player{
    init(config){
        this.name = config.name;
        this.posX = config.posX;
        this.posY = config.posY;
    }

    test(){
        console.log("hola");
    }
}

export {Player};