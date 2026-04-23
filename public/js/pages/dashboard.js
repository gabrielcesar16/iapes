import api from "../api.js"

if (!localStorage.getItem("token")) {
    window.location.href = "/pages/login.html";
}

async function init() {

    try {
        const profile = await api("/users/profile")
        document.getElementById("userEmail").innerText = "Logado como: " + profile.email

        await carregarDisciplinas()

    } catch (err) {
        console.error(err)
    }
    
}

async function carregarDisciplinas() {
    const tabela = document.getElementById("tabelaDisciplinas")
    
    try {
        const disciplinas = await api("/disciplinas")
        console.log("DISCIPLINAS: ", disciplinas)

        tabela.innerHTML = ""

        disciplinas.forEach( d => {
            const tr = document.createElement("tr")
            tr.innerHTML = `
                <td>${d.nome}</td>
                <td>${d.cargaHoraria}</td>
                <td>${d.semestre}</td>
            `
            tabela.appendChild(tr)
        })

    } catch (err) {
        console.error(err)
        tabela.innerHTML = `
        <tr>
            <td colspan="3">Erro ao carregar disciplinas</td>
        </tr>
        `
    }
}


//Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/pages/login.html"
})

init()