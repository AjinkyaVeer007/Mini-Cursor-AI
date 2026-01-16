import { z } from "zod";
import fs from "fs";
import { tool } from "@openai/agents";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

export const createFolderTool = tool({
  name: "create_folder",
  description: "Create a folder",
  parameters: z.object({
    folderName: z.string().describe("Name of the folder including path"),
  }),
  async execute({ folderName }) {
    console.log(
      "⛏️ create_folder tool called with params : " + `${folderName}`
    );
    fs.mkdirSync(folderName);
    return `Folder created successfully`;
  },
});

export const createFileTool = tool({
  name: "create_file",
  description: "Create a file with provided content",
  parameters: z.object({
    fileName: z
      .string()
      .describe("Name of the file along with path including extension"),
    code: z.string().describe("Full file content"),
  }),
  async execute({ fileName, code }) {
    console.log(
      "⛏️ create_file tool called with params : " + `${(fileName, code)}`
    );

    fs.writeFileSync(fileName, code);
    return `File ${fileName} created successfully`;
  },
});

export const shellTool = tool({
  name: "run_shell_command",
  description: "Execute a shell command in the local terminal",
  parameters: {
    type: "object",
    additionalProperties: false,
    properties: {
      command: {
        type: "string",
        description: "The shell command to execute",
      },
      cwd: {
        type: "string",
        description: "Working directory for the command",
        default: process.cwd(),
      },
    },
    required: ["command", "cwd"],
  },
  async execute({ command, cwd }) {
    console.log("🔨 shellTool called with params : " + `${(command, cwd)}`);
    try {
      const { stdout, stderr } = await execAsync(command, {
        cwd: cwd || process.cwd(),
      });

      return {
        stdout,
        stderr,
        success: true,
      };
    } catch (err) {
      return {
        stdout: err.stdout ?? "",
        stderr: err.stderr ?? err.message,
        success: false,
      };
    }
  },
});
