import{Game} from "./game.js";

let configuration = {
    "players" : [
        {
            "idPlayer": "1",
            "vida" : "100",
        },
        {
            "idPlayer": "2",
            "vida" : "100",
        },
        {
            "idPlayer": "3",
            "vida" : "100",
        },
    ]
}


let game=new Game();
game.crearMapa();
game.drawBoard();