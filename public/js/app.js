const API_URL = "http://localhost:3000"

let token = ""

function log(data) {
    document.getElementById("output").innerText = JSON.stringify(data, null, 2)
}

async function register() {
    const email = document.getElementById("registerEmail").value
    const password = document.getElementById("registerPassword").value

    const res = await fetch(API_URL + "/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })

    const data = await res.json()
    log(data)
}

async function login() {
    const email = document.getElementById("loginEmail").value
    const password = document.getElementById("loginPassword").value

    const res = await fetch(API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })

    const data = await res.json()

    token = data.token
    log(data)

}

async function getProfile() {
    const res = await fetch(API_URL + "/users/profile", {
        method: "GET",
        headers: {
            "authorization" : "Bearer " + token
        }
    })

    const data = await res.json()
}

