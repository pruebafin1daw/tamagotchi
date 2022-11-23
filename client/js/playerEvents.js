
function init(player, socket){
    document.addEventListener('keyup', (event) => {
        switch(event.code){
            case "ArrowUp":
                sendMessage("up", player, socket)
                break;
            case "ArrowRight":
                sendMessage("right", player, socket)
                break;
            case "ArrowDown":
                sendMessage("down", player, socket)
                break;
            case "ArrowLeft":
                sendMessage("left", player, socket)
                break;
        }
    });

}

function sendMessage(direction, player, socket){
    console.log(player);
    let message = {
        tipo: 0,
        mensaje: {
            type: "move",
            direction: direction,
            playerId: player.id
        }
    }
    socket.send(JSON.stringify(message))
}

export {init};