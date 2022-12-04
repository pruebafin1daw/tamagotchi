import { Communication } from "./communication.js";

let communication = new Communication();
communication.init({
    ip: "localhost",
    port: "8023",
    dimensions: {
        width: 10,
        height: 10
    }
});