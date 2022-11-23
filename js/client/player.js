class Player {
    constructor() {
        this.x;
        this.y;
        this.life = 100;
    }

    move() {
        document.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    break;
                case 'ArrowRight':
                    break;
                case 'ArrowDown':
                    break;
                case 'ArrowLeft':
                    break;
            }
        });
    }
}

export {Player};