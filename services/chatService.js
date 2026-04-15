import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function sendMessageToAI(message) {
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash"
    })
    const result = await model.generateContent(message)

    return result.response.text()
}