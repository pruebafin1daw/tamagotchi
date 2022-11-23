import { Master } from "./master/master.js";
import { Player } from "./client/player.js";

let master = new Master();
master.createTable(4);
let player = new Player();
player.move();