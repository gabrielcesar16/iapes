
const token = localStorage.getItem("token")
window.addEventListener("DOMContentLoaded", () => {
    getProfile
})

if(!token) {
    window.location.href = "/"
}

function log(data) {
    document.getElementById("output").innerText = JSON.stringify(data, null, 2)

}

async function getProfile() {
    try {
        const res = await fetch("/users/profile", {
        headers: {
            "Authorization": "Bearer " + token
        }
        })
        const data = await res.json()
        log(data)
    } catch (err) {
        console.error(err)
        log({ error : "Erro ao buscar perfil"})
    }
   
}

function logout() {
    localStorage.removeItem("token")
    window.location.href = "/"
}


const btnLogout = document.querySelector('button#btnLogout')
const btnGetProfile = document.querySelector('button#btnGetProfile')

btnLogout.addEventListener("click", logout)
btnGetProfile.addEventListener("click", getProfile)