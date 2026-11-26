import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatOpenRouter } from "@langchain/openrouter";
import dotenv from "dotenv"
dotenv.config()
const groq = new ChatGroq({
    model: "openai/gpt-oss-120b"
})

const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-3.8-flash",
    apiKey: process.env.GOOGLE_API_KEY,
    maxRetries: 3,
    timeout: 30000
})

const openRouter = new ChatOpenRouter({
    model: "deepseek/deepseek-chat",
    temperature:0,
    maxTokens:2500
})  

export const getModel = async (agent) => {
    switch (agent) {
        case "chat":
            return groq;

        case "search":
            return groq;

        case "coding":
            return openRouter;
            
        case "imageAnalyzer":
            return gemini;
        case "pdfRag":
            return gemini;

        default:
            return groq;
    }
}