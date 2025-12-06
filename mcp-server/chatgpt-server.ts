#!/usr/bin/env node
/**
 * MCP Server for ChatGPT-5.1 Access
 *
 * This server provides GitHub Copilot access to OpenAI's GPT-5.1 model
 * through the Model Context Protocol (MCP).
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";

// Load .env.local file
function loadEnv() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const [key, ...valueParts] = trimmed.split("=");
        const value = valueParts.join("=").trim();
        if (key && value) {
          process.env[key] = value;
        }
      }
    });
  }
}

loadEnv();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
});

// Available tools
const TOOLS: Tool[] = [
  {
    name: "chatgpt_query",
    description:
      "Send a query to ChatGPT-5.1 (latest OpenAI model from Nov 2025). Use this for complex reasoning, translation, code generation, or any task requiring advanced AI capabilities.",
    inputSchema: {
      type: "object",
      properties: {
        prompt: {
          type: "string",
          description: "The prompt/question to send to ChatGPT-5.1",
        },
        system: {
          type: "string",
          description:
            'Optional system message to set context/behavior (e.g., "You are a professional translator")',
        },
        temperature: {
          type: "number",
          description:
            "Temperature for response randomness (0.0-2.0). Lower = more deterministic. Default: 0.7",
          minimum: 0,
          maximum: 2,
        },
        max_tokens: {
          type: "number",
          description: "Maximum tokens in response. Default: 4000",
        },
      },
      required: ["prompt"],
    },
  },
  {
    name: "chatgpt_translate",
    description:
      "Translate text using ChatGPT-5.1 with professional quality. Supports all major languages.",
    inputSchema: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "Text to translate",
        },
        target_language: {
          type: "string",
          description:
            'Target language (e.g., "Russian", "German", "Georgian")',
        },
        source_language: {
          type: "string",
          description:
            "Source language (optional, auto-detected if not provided)",
        },
        context: {
          type: "string",
          description:
            'Additional context or instructions for translation (e.g., "Keep technical terms in English")',
        },
      },
      required: ["text", "target_language"],
    },
  },
  {
    name: "chatgpt_conversation",
    description:
      "Have a multi-turn conversation with ChatGPT-5.1. Maintains context across messages.",
    inputSchema: {
      type: "object",
      properties: {
        messages: {
          type: "array",
          description: "Array of conversation messages with role and content",
          items: {
            type: "object",
            properties: {
              role: {
                type: "string",
                enum: ["system", "user", "assistant"],
              },
              content: {
                type: "string",
              },
            },
            required: ["role", "content"],
          },
        },
        temperature: {
          type: "number",
          description:
            "Temperature for response randomness (0.0-2.0). Default: 0.7",
          minimum: 0,
          maximum: 2,
        },
      },
      required: ["messages"],
    },
  },
];

// Create MCP server
const server = new Server(
  {
    name: "chatgpt-5.1-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle tool list requests
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: TOOLS,
  };
});

// Handle tool execution requests
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "chatgpt_query": {
        const {
          prompt,
          system,
          temperature = 0.7,
          max_tokens = 4000,
        } = args as {
          prompt: string;
          system?: string;
          temperature?: number;
          max_tokens?: number;
        };

        const messages: Array<{ role: "system" | "user"; content: string }> =
          [];
        if (system) {
          messages.push({ role: "system", content: system });
        }
        messages.push({ role: "user", content: prompt });

        const response = await openai.chat.completions.create({
          model: "gpt-5.1",
          messages,
          temperature,
          max_completion_tokens: max_tokens,
        });

        const result =
          response.choices[0]?.message?.content || "No response generated";

        return {
          content: [
            {
              type: "text",
              text: result,
            },
          ],
        };
      }

      case "chatgpt_translate": {
        const { text, target_language, source_language, context } = args as {
          text: string;
          target_language: string;
          source_language?: string;
          context?: string;
        };

        let systemPrompt = `You are a professional translator. Translate the following text to ${target_language}.`;
        if (source_language) {
          systemPrompt += ` The source language is ${source_language}.`;
        }
        systemPrompt +=
          " Preserve formatting and style. Output ONLY the translation.";

        if (context) {
          systemPrompt += `\n\nAdditional instructions: ${context}`;
        }

        const response = await openai.chat.completions.create({
          model: "gpt-5.1",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: text },
          ],
          temperature: 0.3,
          max_completion_tokens: 4000,
        });

        const translation =
          response.choices[0]?.message?.content || "Translation failed";

        return {
          content: [
            {
              type: "text",
              text: translation,
            },
          ],
        };
      }

      case "chatgpt_conversation": {
        const { messages, temperature = 0.7 } = args as {
          messages: Array<{
            role: "system" | "user" | "assistant";
            content: string;
          }>;
          temperature?: number;
        };

        const response = await openai.chat.completions.create({
          model: "gpt-5.1",
          messages,
          temperature,
          max_completion_tokens: 4000,
        });

        const result =
          response.choices[0]?.message?.content || "No response generated";

        return {
          content: [
            {
              type: "text",
              text: result,
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error: any) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("ChatGPT-5.1 MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
