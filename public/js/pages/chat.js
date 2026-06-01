import api from "../api.js"

const chatDiv = document.getElementById("chat")
const input = document.getElementById("inputChat")
const btn = document.getElementById("inputChatBtn")
const assistantBtn = document.getElementById("assistantChatBtn")


let assistantMode = false

// MODO CHATBOT

const sendMessage = async () => {

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

// MODO ASSISTENTE

const enterAssistantMode = () => {
    assistantMode = true
    input.disabled = true
    btn.disabled = true

    chatDiv.innerHTML += `<p><b>Assistente:</b>
    O que você gostaria de saber?</p>`

    const opcoes = document.createElement("div")
    opcoes.id = "assistantOpcoes"
    opcoes.innerHTML = `
        <button class="opcao-btn" data-acao="faltas"> Ver minhas faltas. </button>
        <button class="opcao-btn" data-acao="faltasSobrando"> Quantas faltas tenho sobrando? </button>
    `
    chatDiv.appendChild(opcoes)

    opcoes.querySelectorAll(".opcao-btn").forEach( b => {
        b.addEventListener("click", () => handleOpcao(b.dataset.acao) )
    })

    chatDiv.scrollTop = chatDiv.scrollHeight
}

const exitAssistantMode = () => {
    assistantMode = false
    input.disabled = false
    btn.disabled = false

    const opcoes = document.getElementById("assistantOpcoes")
    if (opcoes) opcoes.remove()

    chatDiv.innerHTML += `<p><b>IA:</b> Como posso ajudar? </p>`
    chatDiv.scrollTop = chatDiv.scrollHeight
}

//Nojeira obviamente

const handleOpcao = async (acao) => {
    const opcoes = document.getElementById("assistantOpcoes")
    if (opcoes) opcoes.remove()
    
    if (acao === "faltas") {
        chatDiv.innerHTML += `<p><b>Você:</b> Ver minhas faltas</p>`

        const loading = document.createElement("p")
        loading.innerHTML = "<i>Buscando suas faltas...</i>"
        chatDiv.appendChild(loading)

        try {
            const matriculas = await api("/matriculas")
            loading.remove()

            if (matriculas.length === 0) {
                chatDiv.innerHTML += '<p><b>Assistente:</b> Voce não possui matrículas no momento. </p>'
            } else {
                let resposta = `<p><b>Assistente:</b> Suas faltas por disciplina:<br>`
                matriculas.forEach( m => {
                    resposta += `•<b>${m.disciplina.nome}</b>: ${m.faltas} falta(s)<br>`
                })
                resposta += `</p>`
                chatDiv.innerHTML += resposta
            }
        } catch (err) {
            loading.remove()
            chatDiv.innerHTML += `<p style="color: red;">Erro ao buscar faltas: ${err.error || err.message}</p>`
        }
    }

    if (acao === "faltasSobrando") {
        chatDiv.innerHTML += `<p><b>Você:</b> Quantas faltas tenho sobrando?</p>`

        const loading = document.createElement("p")
        loading.innerHTML = "<i>Calculando...</i>"
        chatDiv.appendChild(loading)

        try {
            const matriculas = await api("/matriculas")
            loading.remove()

            if (matriculas.length === 0 ) {
                chatDiv.innerHTML += `<p><b>Assistente:</b> Você não possui matrículas no momento.</p>`
            } else {
                
                let resposta = `<p><b>Assistente:</b> Faltas restantes por disciplina:<br>`
                matriculas.forEach( m => {
                  const horasPorAula = m.disciplina.cargaHoraria / 20
                  const horasPermitidas = m.disciplina.cargaHoraria * 0.25
                  const horasUsadas = m.faltas * horasPorAula
                  const horasRestantes = horasPermitidas - horasUsadas
                  const faltasRestantes = Math.floor(horasRestantes / horasPorAula)

                  const status = horasRestantes <= 0
                    ? `<span style="color:red"> Reprovado por falta!</span>`
                    : `${faltasRestantes} faltas(s) - ${horasRestantes}h disponíveis`

                    resposta += `<b>${m.disciplina.nome}</b>: ${status}<br>`
                })
                resposta += `</p>`
                chatDiv.innerHTML += resposta
            }
        } catch (err) {
            loading.remove()
            chatDiv.innerHTML += `<p style ="color:red;">Erro: ${err.error || err.message}</p>`
        }
        
    }

    const acoes = document.createElement("div")
    acoes.innerHTML = `
        <button id="voltarMenuBtn">Voltar</button>
        <button id="sairAssistenteBtn">Sair</button>
    `
    chatDiv.appendChild(acoes)

    document.getElementById("voltarMenuBtn").addEventListener("click", () => {
        acoes.remove()
        enterAssistantMode()
    })

    document.getElementById("sairAssistenteBtn").addEventListener("click", () => {
        acoes.remove()
        exitAssistantMode()
    })

    chatDiv.scrollTop = chatDiv.scrollHeight

}

btn.addEventListener("click", sendMessage)

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage()
})

assistantBtn.addEventListener("click", () => {
    if (assistantMode) {
        exitAssistantMode()
    } else {
        enterAssistantMode()
    }
})