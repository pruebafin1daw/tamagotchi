class Client {
    active = false;
    map = null;

    init(comunication, id) {
        this.id = id;
        this.comunication = comunication;
        this.comunication.handler = this;
        this.comunication.sendId(id, "nuevo cliente");
    }

    newMsg(msg, origin) {
        console.log(msg);
    }
}

export { Client };