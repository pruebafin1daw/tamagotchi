class Player {
    constructor(board) {
        this.board = board;
    }

    init(config) {
        this.name = config.name;
        this.x = config.x;
        this.y = config.y;
        this.status = config.status;
    }

    createMovementPlayer() {
        window.addEventListener("keyup", this.movementPlayer);
    }

    movementPlayer = (event) => {
        switch(event.code) {
            case "ArrowUp":
                this.move('up');
                break;
            case "ArrowLeft":
                this.move('left');
                break;
            case "ArrowDown":
                this.move('down');
                break;
            case "ArrowRight":
                this.move('right');
                break;
        }
    }

    move(direction) {
        switch(direction) {
            case "up":
                break;
            case "left":
                break;
            case "down":
                break;
            case "right":
                break;
        }
    }

    changeLife(amount) {
        this.status += amount;
    }

    attack(player) {

    }
}

export { Player }