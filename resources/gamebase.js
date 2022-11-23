class GameMaster {
    
    init(gameStats){
        this.mapGenerator(5, gameStats);
        this.randomizePosition(gameStats);
    }
    mapGenerator(input, gameStats){ 
        if (input % 2 != 0){
            input-=1;
        }
        let i = 0;
        while (i < input) {
            let j = 0;            
            while (j < input) {
                gameStats.map.tiles[j] = gameStats.tile;
                j++;
            }
            i++;
        }
        console.log(gameStats.map)   
    }
    randomizePosition(gameStats){
        gameStats.playerCharacter.positionX = Math.floor(Math.random() * gameStats.map.tiles.length)
        gameStats.playerCharacter.positionY = Math.floor(Math.random() * gameStats.map.tiles.length)
        
        console.log(gameStats.playerCharacter)
    }
}
export {GameMaster}