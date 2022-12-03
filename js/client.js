class Client {
    active = false;
    map = null;

    init(comunication, id) {
        this.id = id;
        this.comunication = comunication;
        this.comunication.handler = this;
        this.comunication.sendId(id, "nuevo cliente");
        this.move();
    }

    move() {
        document.querySelector('.container').addEventListener('click', () => {
            console.log('click');
            this.newMsg({
                'move': 'i want to move',
                'id': this.id
            }, 0);
        });
    }
    
    newMsg(msg, type) {
        this.comunication.send(msg, type);
    }
}

export { Client };