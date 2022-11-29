class Player{
    constructor(x, y, health) {
        this.x = x;
        this.y = y;
        this.health = health;
    }

    movimiento(){
        this.move = [];
        var x;
        var y;
        switch(this.move){
            case 'w':
                x = Jugador.x;
                y = Jugador.y - 1;
                this.move.push(x, y);
                break;
            case 's':
                x = Jugador.x;
                y = Jugador.y + 1;
                this.move.push(x, y);
                break;
            case 'd':
                x = Jugador.x + 1;
                y = Jugador.y;
                this.move.push(x, y);
                break;
            case 'a':
                x = Jugador.x - 1;
                y = Jugador.y;
                this.move.push(x, y);
                break;
        }
        mover(this.move[0], this.move[1]);
    }
    mover(x, y) {
        if (x >= 0 && x < map[y].length && y >= 0 && y < map.length) {
            if (map[y][x] == 0){
                map[Jugador.y][Jugador.x] = 0;
                Jugador.x = x;
                Jugador.y = y;
                map[y][x] = Jugador;
            }else if(map[y][x] == 1){
                map[Jugador.y][Jugador.x] = Jugador;    
            }
        }
    }
}
export {Player};
