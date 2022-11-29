import { Connection } from './connection.js';

class Client {
    init() {
        // CONNECTION
        let connection = new Connection();
        connection.init({
            'ip': 'localhost',
            'port': '8023'
        });
    }
}

let client = new Client();
client.init();