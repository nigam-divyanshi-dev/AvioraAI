//USE IMAGE ANALYSER MODEL : GEMNI image to text api
//we read and get image buffer in return 
// then we convert it to base 64 image 
// then we send the messages array - system message and human message to gemini model and get the response

import { HumanMessage, SystemMessage } from "@langchain/core/messages"
import { getModel } from "../config/llmModels.js"
import fs from "fs/promises"
import { deductCredits } from "../utils/deductCredits.js"
export const imageAnalyzer=async (state)=>{
try {
    const llm=await getModel("imageAnalyzer")

    const imageBuffer=await fs.readFile(state.file.path)
    const base64Image=imageBuffer.toString("base64")

    const messages=[
        new SystemMessage(
            `You are AvioraAI image analyzer Agent.

Rules:

- Analyze only the uploaded image.
- Answer the user's question accurately.
- If text exists in the image, extract it.
- If charts or tables exist, explain them.
- If something is unclear, say so.
- Use Markdown when helpful.
- Do not hallucinate.
`
        ),
        new HumanMessage(
            {
                content:[
                    {
                        type:"text",
                        text:state.prompt || "Analyze the uploaded image and provide insights."
                    },
                    {
                        type:"image_url",
                        image_url:{
                            url:`data:${state.file.mimetype};base64,${base64Image}`,
                        }  
                    }
                ]
            }
        )
    ]
console.log("image agent start")
const response = await llm.invoke(messages)
console.log("image agent end")
await deductCredits(state.userId,"vision")
return {
    ...state,
    aiResponse:response.content
}

} catch (error) {
    console.error(error)
    return {
        ...state,
        aiResponse:"Failed to analyze file"
    }

} finally {
    await fs.unlink(state.file.path)
}
}