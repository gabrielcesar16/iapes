const API_URL = ""
let token = ""

function log(data) {
    document.getElementById("output").innerText = JSON.stringify(data, null, 2)
}

async function register() {
    const email = document.getElementById("registerEmail").value
    const password = document.getElementById("registerPassword").value

    const res = await fetch("/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email,
            password
        })
    })

    const data = await res.json()
    if(!res.ok) {
        log(data)
        return
    }
}

async function login() {
    try {

        const email = document.getElementById("loginEmail").value
        const password = document.getElementById("loginPassword").value

        //Response
        const res = await fetch("/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email, password})
    })

        const data = await res.json()

        if (!res.ok){
            log(data)
            return
        }

        //Salvar token e user
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))


        //REDIRECIONAMENTO
        window.location.href = "/dashboard.html"
    
    } catch (err) {
        console.error(err)
        log({
            error: "Erro no login"
        })
    } 
}

async function getProfile() {
    const token = localStorage.getItem("token")

    const res = await fetch("/users/profile", {
        method: "GET",
        headers: {
            "Authorization" : "Bearer " + token
        }
    })

    const data = await res.json()
    log(data)
}

const registerbtn = document.querySelector("button#register")
registerbtn.addEventListener("click", register)
