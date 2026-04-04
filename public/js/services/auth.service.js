import api from "../api.js"


//LOGIN

export async function loginUser(email, password) {
    return api("/users/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password
        })
    })
    
}

// REGISTER

export async function registerUser(email, password) {
    return api("/users/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password
        })
    })
}

//PERFIL AUNTENTICADO

export async function getProfile() {
    return api("users/profile")
}

//LOGOUT

export function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
}