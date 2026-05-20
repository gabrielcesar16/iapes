import Groq from "groq-sdk"

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

const sendMessageToAI = async (message) => {
    const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: message
            }
        ]
    })

    return response.choices[0].message.content
}

export default {
    sendMessageToAI
}