class Player {
    constructor(socket) {
        this.socket = socket;
    }

    init(config) {
        this.type = config.type;
        this.id = config.id;
        this.name = config.name;
        this.x = config.x;
        this.y = config.y;
        this.status = config.status;
        this.createMovement();
    }

    createMovement() {
        window.addEventListener("keyup", this.movementPlayer);
    }

    displayWin() {
        let container = document.getElementById('container');
        let winContainer = document.createElement('div');
        winContainer.className = 'win';
        winContainer.innerHTML = '<span>' + this.name.toUpperCase() + '</span>&nbsp;' + 'HAS WON';
        container.appendChild(winContainer);
        
        let message = {
            'tipo': 0,
            'mensaje': ['winner', this.name]
        }
        this.socket.send(JSON.stringify(message));
    }

    stopMovement(win) {
        window.removeEventListener("keyup", this.movementPlayer);
        if (win) this.displayWin();
    }

    movementPlayer = (event) => {
        let direction = '';

        switch(event.code) {
            case "ArrowUp":
                direction = 'up';
                console.log('up');
                break;
            case "ArrowLeft":
                direction = 'left';
                console.log('left');
                break;
            case "ArrowDown":
                direction = 'down';
                console.log('down');
                break;
            case "ArrowRight":
                direction = 'right';
                console.log('right');
                break;
        }

        let message = {
            'tipo': 0,
            'mensaje': ['movePlayer', this.id, direction]
        }
        this.socket.send(JSON.stringify(message));
    }

    changeLife(amount) {
        
    }

    attack(player) {

    }
}

export { Player }