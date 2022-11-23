class Player{
    constructor(config){
        this.id = config.id;
        this.nickname = config.nickname;
        this.posX = config.posX;
        this.posY = config.posY;
    }

    haveSameCoords(player){
        let isPosxDifferent = this.posX != player.posX;
        let isPosyDifferent = this.posY != player.posY;
        if(isPosxDifferent){
            return 0;
        }

        if(isPosyDifferent){
            return 1;
        }

        return -1;
    }

    move(posX, posY){
        this.posX = posX;
        this.posY = posY;
    }
}

export {Player};