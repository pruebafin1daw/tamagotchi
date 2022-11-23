import { GameMaster } from "./resources/gamebase.js";

let gameStats = {
    "playerCharacter" : {
        "type" : 1,
        "health" : 100,
        "positionX" : 0,
        "positionY" : 0,
        "action" : "actionTaken"
    },
    "tile" : {
        "type" : 0,
        "players" : []
    },
    "map" : {   
        "tiles" : [],
        "playerSpawnable" : []        
    },
    "keys" : {
        LEFT    : 37,
        UP      : 38,
        RIGHT   : 39,
        DOWN    : 40,
        ENTER   : 13,
        SPACE   : 32
    },
    "actions" : {
        "move" : "key",
        "fight" : "fightAction",
        "rest" : "noAction",
        "start" : "startAction",
        "burrow" : "burrowAction"
    }
}
let start = new GameMaster;
start.init(gameStats);