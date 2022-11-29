class Player {
    init(config) {
        this.type = config.type;
        this.id = config.id;
        this.name = config.name;
        this.x = config.x;
        this.y = config.y;
        this.status = config.status;
    }

    

    changeLife(amount) {
        this.status += amount;
    }

    attack(player) {

    }
}

export { Player }