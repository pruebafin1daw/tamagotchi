class Board{
    cellTypes = {
        1: "O",
        2: "#",
        3: "G",
    }
    communication = null;
    init(config){
        this.communication = config.communication;
    }
    
    removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    
    drawBoard(board){
        if(this.communication.clientPlayer){
            board[this.communication.clientPlayer.posY][this.communication.clientPlayer.posX] = this.communication.clientPlayer;
        }
        let container = document.getElementById("container");
        this.removeAllChildNodes(container);
    
        for (const row of board) {
            let rowDiv = document.createElement("div");
            rowDiv.classList.add("row");
            for (const square of row) {
                let squareDiv = document.createElement("div");
                squareDiv.classList.add("cell");
                if(square.nickname){
                    squareDiv.classList.add("player");
                    squareDiv.innerHTML = "P";
                }else{
                    squareDiv.innerHTML = this.cellTypes[square.type];
                }
                rowDiv.appendChild(squareDiv);
            }
            container.appendChild(rowDiv);
        }
    }
    
    movePlayer(posX, posY){
        this.communication.clientPlayer.move(posX, posY);
    }

    static masterError(){
        let h1 = document.createElement("h1");
        h1.innerHTML = "The Master must be active before creating any client";
        document.body.appendChild(h1);
        console.log("GELLO");
    }
    
}

export {Board};