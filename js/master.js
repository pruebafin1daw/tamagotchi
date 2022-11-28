import { Client } from "./client.js";

class Master {
    constructor() {
        this.clients = [];
    }

    init() {
        return 'soy el master';
    }

    addClient(client) {
        this.clients.push(client);
    }
}

export {Master};