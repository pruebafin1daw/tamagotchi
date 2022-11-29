class Master {
    constructor() {
        this.players = [];
        this.map;
    }

    init() {
        return 'I am the master';
    }

    addPlayer(player) {
        this.players.push(player);
    }

    getPlayers() {
        this.players.forEach(player => {
            console.log(player);
        });
    }

    setMap(map) {
        this.map = map;
    }
}

export {Master};