import OpenAI from "openai";

process.loadEnvFile("./.env");

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER,
  defaultHeaders: {
    "HTTP-Referer": "https://aigalaxy.tech",
    "X-Title": "AIGalaxy",
  },
});

const completion = await openai.chat.completions.create({
  model: "x-ai/grok-4.1-fast:free",
  messages: [
    {
      role: "user",
      content: "What is the meaning of life?",
    },
  ],
});

console.log(completion.choices[0].message.content);
