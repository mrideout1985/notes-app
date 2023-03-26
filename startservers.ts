import run from "concurrently";

// Define the commands to run
const commands = [
  { command: "cd path/to/frontend && npm start", name: "Frontend" },
  { command: "cd path/to/backend && npm run dev", name: "Backend" },
];

// Start the servers using the `concurrently` package
async function startServers() {
  try {
    await run(commands);
    console.log("Servers started successfully!");
  } catch (error) {
    console.error("Error starting servers:", error);
  }
}

startServers();
