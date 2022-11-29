class Player {
    constructor() {
        this.x; 
        this.y;
        this.map;
    }

    init() {
        return "I am a player";
    }

    setMap(map) {
        this.map = map;
    }
}

export {Player};