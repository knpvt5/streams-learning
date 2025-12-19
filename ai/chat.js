import OpenAI from "openai";

process.loadEnvFile("./.env");

const openai = new OpenAI({
  //   apiKey: process.env.OPEN_ROUTER,
  apiKey: process.env.NVIDIA_API,
  //   baseURL: "https://openrouter.ai/api/v1",
  baseURL: "https://integrate.api.nvidia.com/v1",
  project: "AIGalaxy",
  defaultHeaders: {
    "HTTP-Referer": "https://aigalaxy.tech",
    "X-Title": "AIGalaxy",
  },
});

export async function chat(question) {
  const completion = await openai.chat.completions.create({
    // model: "allenai/olmo-3.1-32b-think:free",
    // model: "nvidia/nemotron-3-nano-30b-a3b",
    // model: "openai/gpt-oss-120b",
    model: "moonshotai/kimi-k2-thinking",
    messages: [{ role: "user", content: question }],
    temperature: 1,
    top_p: 1,
    max_tokens: 16384,
    chat_template_kwargs: { enable_thinking: true },
    stream: true,
  });

  for await (const chunk of completion) {
    // console.log(chunk.choices[0].delta)
    // return
    const reasoning = chunk.choices[0]?.delta?.reasoning_content;
    if (reasoning) process.stdout.write(reasoning);
    // const content = chunk.choices[0]?.delta?.content || "";
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }

  return null;
}

// aiChat();F
