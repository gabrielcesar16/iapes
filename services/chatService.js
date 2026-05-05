import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const sendMessageToAI = async (message) => {
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash"
    })

    const result = await model.generateContent(message)

    return result.response.text()
}

export default {
    sendMessageToAI
}