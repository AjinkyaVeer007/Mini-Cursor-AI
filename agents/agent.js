import { Agent } from "@openai/agents";
import { createFileTool, createFolderTool, shellTool } from "../tools/tools.js";
import { systemPrompt } from "../system_prompt/system_prompt.js";

export const agent = new Agent({
  name: "Assistant",
  instructions: systemPrompt,
  tools: [createFolderTool, createFileTool, shellTool],
});
