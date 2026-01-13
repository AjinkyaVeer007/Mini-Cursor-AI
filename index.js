import dotenv from "dotenv";
import { run } from "@openai/agents";
import { agent } from "./agents/agent.js";

dotenv.config();

const result = await run(agent, "What is the weather of Mumbai and Karad");

console.log(result.finalOutput);
