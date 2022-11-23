import {Game} from "./game.js";
let box = {
    "posX" : 0,
    "posY" : 0,
    "type" : 0,
    "players" : []
}

let game = new Game();
game.init(box);
console.log(JSON.stringify(game.init(box)));