import { OpenRouter } from "@openrouter/sdk"
import dotenv from "dotenv";
dotenv.config()
const client = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY
});


export async function askAIRouter(userMessage: string) {
    console.log("➡️ ASK AI:", userMessage);
    const response = await client.chat.send({
        chatRequest: {
            model: "openrouter/free",
            messages: [
                {
                    role: "system",
                    content: `You are a financial assistant for our application.
                    You can ONLY answer questions related to:
                    - payments
                    - savings
                    - transactions
                    - financial strategies
                    - financial features of this application

                    If the user asks about an unrelated topic,
                    politely refuse to answer.

                    Do not discuss unrelated topics.`,
                },
                {
                    role: "user",
                    content: userMessage
                }
            ]
        }
    });

    console.log("⬅️ AI RESPONSE:", response);
    // return response.choices[0]?.message?.content ?? "";
}