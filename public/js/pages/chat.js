import api from "../api.js"

const chatDiv = document.getElementById("chat")
const input = document.getElementById("inputChat")
const btn = document.getElementById("inputChatBtn")

async function sendMessage() {

    const message = input.value.trim();

    if (!message) return

    chatDiv.innerHTML += `<p><b>Você:</b> ${message}</p>`
    
    input.value = ""

    const typing = document.createElement("p")
    typing.innerHTML = "<i>IA digitando...</i>"
    chatDiv.appendChild(typing)

    try {
        const data = await api("/chat", {
            method: "POST",
            body: JSON.stringify({message})
        })

        typing.remove()

        chatDiv.innerHTML += `<p><b>IA:</b> ${data.reply || data.error || "Sem resposta"}</p>`

    } catch (error) {

        typing.remove()

        chatDiv.innerHTML += `
        <p style="color:red;">
        Erro: ${error.error || error.message}
        ${error.details ? `<pre>${JSON.stringify(error.details, null, 2)}</pre>` : ""}
        </p>`
        
    }

    input.value=""
    chatDiv.scrollTop = chatDiv.scrollHeight
    
}

btn.addEventListener("click", sendMessage)

