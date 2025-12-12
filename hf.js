import { OpenAI } from "openai";

process.loadEnvFile("./.env");

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const chatCompletion = await client.chat.completions.create({
  model: "zai-org/GLM-4.6V:zai-org",
  messages: [
    {
      role: "user",
      // content: [
      //     {
      //         type: "text",
      //         text: "Describe this image in one sentence.",
      //     },
      //     {
      //         type: "image_url",
      //         image_url: {
      //             url: "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg",
      //         },
      //     },
      // ],
      content: "what is ai",
    },
  ],
//   stream: true,
});

console.log(chatCompletion.choices[0].message);


// for await (const chunk of stream) {
//     // console.log(chunk.choices[0]?.delta)
// //   process.stdout.write(chunk.choices[0]?.delta?.content || "");
//   console.log(chunk.choices[0]?.delta?.content || "");
// }
