import {GameMaster} from "./game.js";

let size = document.getElementById('size');
let number = document.getElementById('number');
let button = document.getElementById('button');
button.addEventListener("click", send);
function send(){
    let hide = document.getElementById('form');
    hide.style.display = "none";
    let form = {
        "size": size.value,
        "number": number.value
    }
    let game = new GameMaster();
    game.init(form);
}
