import OpenAI from "openai";

process.loadEnvFile("./.env");

const openai = new OpenAI({
  apiKey: process.env.OPEN_ROUTER,
  //   apiKey: process.env.NVIDIA_API,
  baseURL: "https://openrouter.ai/api/v1",
  //   baseURL: "https://integrate.api.nvidia.com/v1",
  project: "AIGalaxy",
  defaultHeaders: {
    "HTTP-Referer": "https://aigalaxy.tech",
    "X-Title": "AIGalaxy",
  },
});

export async function aiChatOr(res, question) {
  const completion = await openai.chat.completions.create({
    // model: "allenai/olmo-3.1-32b-think:free",
    // model: "openai/gpt-oss-20b:free",
    // model: "mistralai/devstral-2512:free",
    // model: "moonshotai/kimi-k2-thinking:free",
    // model: "kwaipilot/kat-coder-pro:free",
    model: "amazon/nova-2-lite-v1:free",
    messages: [{ role: "user", content: question }],
    temperature: 1,
    top_p: 1,
    max_tokens: 16384,
    // reasoning_effort: "high",
    // response_format: "streaming",
    stream: true,
  });

  for await (const chunk of completion) {
    console.log(chunk.choices[0].delta)
    // return
    // const reasoning = chunk.choices[0]?.delta?.reasoning_content;
    const reasoning = chunk.choices[0]?.delta?.reasoning;
    // if (reasoning) process.stdout.write(reasoning);
    if (reasoning) res.write(`REASONING: ${reasoning} \n`);
    const content = chunk.choices[0]?.delta?.content || "";
    // process.stdout.write(chunk.choices[0]?.delta?.content || "");
    res.write(`DATA: ${content} \n`);
  }

  return "ENDED";
}

// aiChatOr();
