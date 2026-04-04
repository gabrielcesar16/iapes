import { registerUser } from "../services/auth.service"

const form = document.querySelector("#registerForm")
const output = document.querySelector("#output")

function log(data) {
    if (output) {
        output.innerText = JSON.stringify(data, null, 2)
    }
}

form.addEventListener("submit", async (event) => {
    
    event.preventDefault()

    const email = document.querySelector("#registerEmail").value
    const password = document.querySelector("#registerPassword").value

    try {
        const data = await registerUser(email, password)
        //Redirect
        window.location.href = "/pages/login.html"
    } catch (err) {
        log({
            error: err.message || "Erro no cadastro"
        })
    }

})