let communicationInstance = null;
function setEvents(communication, player){
    communicationInstance = communication
    document.addEventListener('keyup', (event) => {
        switch(event.code){
            case "ArrowUp":
                sendMessage("up", player)
                break;
            case "ArrowRight":
                sendMessage("right", player)
                break;
            case "ArrowDown":
                sendMessage("down", player)
                break;
            case "ArrowLeft":
                sendMessage("left", player)
                break;
        }
    });
}

function sendMessage(direction, player){
    console.log(player);
    communicationInstance.send({
        type: "move",
        direction: direction,
        playerId: player.clientId
    }, communicationInstance.MASTER);
}

export {setEvents};