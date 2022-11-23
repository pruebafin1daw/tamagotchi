const horizontalAxis = 1;
const vertialAxis = 2;

function checkCollision(player, direction, width, height, board){
    console.log(board);
    let playerCopy = {...player};
    let prediction = null;
    let axis = null;
    switch (direction) {
        case "up":
            prediction = -1;
            axis = vertialAxis;
            break;
    
        case "right":
            prediction = 1;
            axis = horizontalAxis;
            break;
            
        case "down":
            prediction = 1;
            axis = vertialAxis;
            break;
        case "left":
            prediction = -1;
            axis = horizontalAxis;
            break;
    }

    if(axis == horizontalAxis){
        playerCopy.posX += prediction;
        if(playerCopy.posX < 0 & playerCopy.posX >= width) return true;
    }else{
        playerCopy.posY += prediction;
        if(playerCopy.posY < 0 & playerCopy.posY >= height) return true;
    }

    let predictionCell = board[playerCopy.posY][playerCopy.posX];
    if(predictionCell.constructor.name == "Cell"){
        if(predictionCell.type == 2) {
            // Implementar meterse en la madriguera
            console.log("METIDO EN MADRIGUERA");
            return true;
        }
    }else{
        // Implementar modo pelea
        console.log("MODO PELEA");
    }

    return false;
}

export {checkCollision};