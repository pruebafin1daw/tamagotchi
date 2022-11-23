import{Game} from "./game.js";
console.log("Hola");
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
game.drawBoard();