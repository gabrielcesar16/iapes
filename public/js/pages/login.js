import { loginUser } from "../services/auth.service.js"

const form = document.querySelector("#loginForm")
const output = document.querySelector("#output")

function log(data) {
    if (output) {
        output.innerText = JSON.stringify(data, null, 2)
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const email = document.querySelector("#loginEmail").value
    const password = document.querySelector("#loginPassword").value

    try {
        const data = await loginUser(email, password)

        //Validação
        if (data.error) {
            log({
                error: data.error
            })
            return
        }

        //Salvar
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))

        //Redirect
        window.location.href = "/pages/dashboard.html"
    } catch (err) {
        log({
            error: err.message || "Erro no login"
        })
    }

})