class Connection {
    socket = null;
    state = false;
    master = false;

    init(config) {
        this.board = config.board;
        this.socket = new WebSocket("ws://" + config.ip + ":" + config.port);

        this.socket.onopen = () => {
            this.state = true;
            const msg = {
                'tipo': 0,
                'mensaje': 'master'
            }
            this.socket.send(JSON.stringify(msg));

            const openedMessage = {
                'tipo': 1,
                'mensaje': ['gameOpened']
            }
            this.socket.send(JSON.stringify(openedMessage));
        };

        this.socket.onmessage = (event) => {
            let data = JSON.parse(event.data);
            switch(data.valor[0]) {
                case "addPlayer":
                    this.board.addPlayer(data.valor[1]);
                    break;
                case "movePlayer":
                    this.board.movePlayer(data.valor[1], data.valor[2]);
                    break;
                case "drawBoard":
                    const msg = {
                        'tipo': 1,
                        'mensaje': ['draw', this.board.table.innerHTML]
                    }
                    this.socket.send(JSON.stringify(msg))
                    break;
                case "winner":
                    this.displayWin(data.valor[1]);
                    break;
            }
        };

        this.socket.onclose = () => {
            this.state = false;
        };

        this.socket.onerror = () => {
            this.state = false;
        };
    }

    displayWin(name) {
        let container = document.getElementById('container');
        let winContainer = document.createElement('div');
        winContainer.className = 'win';
        winContainer.innerHTML = '<span>' + name.toUpperCase() + '</span>&nbsp;' + 'HAS WON';
        container.appendChild(winContainer);
        
        setTimeout(() => {window.location.reload()}, 5000);
    }
}

export { Connection };