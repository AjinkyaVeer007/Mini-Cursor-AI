import dotenv from "dotenv";
import { run, user } from "@openai/agents";
import { agent } from "./agents/agent.js";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

dotenv.config();

const rl = readline.createInterface({ input, output });
let chatHistory = [];

async function main() {
  while (true) {
    const userQuery = await rl.question("> ");

    if (userQuery.toLowerCase() === "exit") {
      rl.close();
      process.exit(0);
    }

    chatHistory.push(user(userQuery));

    const result = await run(agent, chatHistory);

    chatHistory = result.history;

    console.log("🤖", result.finalOutput);
  }
}

main();
