import api from "../api.js"

if (!localStorage.getItem("token")) {
    window.location.href = "/pages/login.html";
}

async function init() {

    try {
        const profile = await api("/users/profile")
        document.getElementById("userEmail").innerText = "Logado como: " + profile.email
    } catch (err) {
        console.error(err)
    }
    
}


//Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/pages/login.html"
})

init()