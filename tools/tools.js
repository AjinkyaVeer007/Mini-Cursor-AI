import { z } from "zod";
import fs from "fs";
import { tool } from "@openai/agents";

export const getWeatherTool = tool({
  name: "get_weather",
  description: "Get the weather for a given city",
  parameters: z.object({ city: z.string() }),
  async execute({ city }) {
    console.log("⛏️ get_weather tool called");
    return `The weather in ${city} is rainy.`;
  },
});

export const getCurrencyTool = tool({
  name: "get_currency",
  description: "Get currency for given country",
  parameters: z.object({ country: z.string() }),
  async execute({ country }) {
    console.log("⛏️ get_currency tool called");
    const curr = {
      india: "Rupees",
      usa: "Dollar",
    };

    return `${country} has ${curr[country.toLowerCase()] ?? "Rupees"} currency`;
  },
});

export const createAnyFileTool = tool({
  name: "create_file",
  description: "Create a file with provided content",
  parameters: z.object({
    fileName: z.string().describe("Name of the file including extension"),
    code: z.string().describe("Full file content"),
  }),
  async execute({ fileName, code }) {
    console.log("⛏️ create_file tool called");
    if (!fs.existsSync("output")) {
      fs.mkdirSync("output");
    }

    fs.writeFileSync(`output/${fileName}`, code);
    return `File ${fileName} created successfully`;
  },
});
