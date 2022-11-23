let cellTypes = {
    1: "O",
    2: "#",
    3: "G",
}
let socket = null;
let clientPlayer = null;

function init(config){
    socket = config.socket;
    clientPlayer = config.clientPlayer;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function drawBoard(board){
    if(clientPlayer){
        board[clientPlayer.posY][clientPlayer.posX] = clientPlayer;
    }
    let container = document.getElementById("container");
    removeAllChildNodes(container);

    for (const row of board) {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        for (const square of row) {
            let squareDiv = document.createElement("div");
            squareDiv.classList.add("cell");
            if(square.nickname){
                squareDiv.innerHTML = "P";
            }else{
                squareDiv.innerHTML = cellTypes[square.type];
            }
            rowDiv.appendChild(squareDiv);
        }
        container.appendChild(rowDiv);
    }
}

function movePlayer(posX, posY){
    clientPlayer.move(posX, posY);
}

export {init, drawBoard, movePlayer};