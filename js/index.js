import { Master } from "./master.js";
import {Player} from "./player.js";

let master = new Master();
master.createTable(4);
let player = new Player();
player.move();