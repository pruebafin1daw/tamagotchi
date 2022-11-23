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

    move(direction){
        console.log(direction);
        switch(direction){
            case "up":
                this.posY -= 1;
                break;
    
            case "right":
                this.posX += 1;
                break;
    
            case "down":
                this.posY += 1;
                break;
    
            case "left":
                this.posX -= 1;
                break;
        }
    }
}

export {Player};