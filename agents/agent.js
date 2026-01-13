import { Agent } from "@openai/agents";
import {
  createAnyFileTool,
  getCurrencyTool,
  getWeatherTool,
} from "../tools/tools.js";
import { systemPrompt } from "../system_prompt/system_prompt.js";

export const agent = new Agent({
  name: "Assistant",
  instructions: systemPrompt,
  tools: [getWeatherTool, getCurrencyTool, createAnyFileTool],
});
