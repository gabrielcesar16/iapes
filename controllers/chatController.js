import { sendMessageToAI } from "../services/chatService.js";

export async function chat(req, res) {
    try {
        const { message } = req.body

        const reply = await sendMessageToAI(message)

        res.json({ reply })
    
    } catch (error) {
        console.error("GEMINI ERROR: ", error)
        
        // dev debug mode
        if (process.env.NODE_ENV === "development"){
            return res.status(500).json({
                error: error.message,
                details: error.response?.data || error,
                status: error.status || 500
            })
        }

        //producao
        return res.status(500).json({
            error : "Erro interno ao gerar resposta"
        })
        
    }
    
}