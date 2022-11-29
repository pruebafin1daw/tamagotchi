class Square {
    init(config) {
        this.type = config.type;
        this.x = config.x;
        this.y = config.y;
        this.players = config.players;
        return this;
    }
}

export { Square }