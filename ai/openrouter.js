import { OpenRouter } from "@openrouter/sdk";

process.loadEnvFile("./.env");

// const client = new OpenRouter({
//   apiKey: process.env.OPEN_ROUTER,
// });

const openRouter = new OpenRouter({
  apiKey: process.env.OPEN_ROUTER,
  defaultHeaders: {
    "HTTP-Referer": "https://aigalaxy.tech",
    "X-Title": "AIGalaxy",
  },
});

const response = await openRouter.chat.send({
  model: "x-ai/grok-4.1-fast:free",
  messages: [{ role: "user", content: "who are u" }],
  stream: false,
});

console.log(response.choices[0].message.content);
