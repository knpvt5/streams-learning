import axios from "axios";

const endpoint = process.env.AZURE_ENDPOINT;
const apiKey = process.env.AZURE_API_KEY;

async function callLLM() {
  const response = await axios.post(
    `${endpoint}`,
    {
      messages: [
        { role: "user", content: "Explain quantum computing in simple words" }
      ],
      model: "gpt-5.2",
      max_tokens: 200
    },
    {
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey
      }
    }
  );

  console.log(response.data);
}

callLLM();
