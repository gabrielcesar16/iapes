import api from "../api.js"
import { updateProfile } from "../services/auth.service.js"

const form = document.querySelector("#registerForm")
const output = document.querySelector("#output")


function log(data) {
    if (output) {
        output.innerText = JSON.stringify(data, null, 2)
    }
}

async function init() {
    try {
        const profile = await api("/users/profile")
        document.querySelector("#configEmail").placeholder = profile.email
        document.querySelector("#configPassword").placeholder = "******"
        

    } catch (err) {
        console.error(err)
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const email = document.querySelector("#configEmail").value
    const password = document.querySelector("#configPassword").value

    try {
        const data = await updateProfile(email, password)
        
        //Validação
        if (data.error) {
            log({
                error: data.error
            })
            return
        }
        
        window.location.href = "/pages/dashboard.html"

       /* log({
            scucesso: "Perfil Atualizado", usuario: data
        })
       */

    } catch (err) {
        log({
            error: err.message || "Erro no cadastro"
        })
    }

})

init()