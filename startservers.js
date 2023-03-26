"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import required packages
var concurrently_1 = require("concurrently");
// Define the commands to run
var commands = [
    { command: "cd front-end && npm run dev", name: "Frontend" },
    { command: "cd back-end && npm run start:dev", name: "Backend" },
];
// Start the servers using the `concurrently` package
function startServers() {
    try {
        (0, concurrently_1.default)(commands);
        console.log("Servers started successfully!");
    }
    catch (error) {
        console.error("Error starting servers:", error);
    }
}
startServers();
