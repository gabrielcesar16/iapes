import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"

dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

async function test() {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash"
        })

        const result = await model.generateContent(
            "Explique o que é JavaScript em 1 frase"
        )

        console.log(result.response.text())

    } catch (error) {
        console.error(error)
    }
    
}

test()