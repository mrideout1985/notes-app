const run = require("concurrently");

// Define the commands to run
const commands = [
  { command: "cd front-end && npm run dev", name: "Frontend" },
  { command: "cd back-end && docker compose up -d", name: "Docker" },
  { command: "cd back-end && npm run start:dev", name: "Backend" },
  { command: "cd back-end && npx prisma db push", name: "Prisma" },
];

// Start the servers using the `concurrently` package
async function startServers() {
  try {
    run(commands);
    console.log("Servers started successfully!");
  } catch (error) {
    console.error("Error starting servers:", error);
  }
}

startServers();
