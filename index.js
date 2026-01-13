import dotenv from "dotenv";
import { run } from "@openai/agents";
import { agent } from "./agents/agent.js";

dotenv.config();

const result = await run(
  agent,
  "Generate a gitignore file for any node js application"
);

console.log(result.finalOutput);
