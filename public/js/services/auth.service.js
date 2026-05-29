import  api  from "../api.js"

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
    return api("/users/register", {
        method: "POST",
        body: JSON.stringify({
            email,
            password
        })
    })
}

//UPDATE

export const updateProfile = async (email, password) => {
    
    const token = localStorage.getItem("token")

    const body = {}
    if (email) body.email = email
    if (password) body.password = password

    return api("/users/profile", {
        method: "PUT",
        body: JSON.stringify(body)
    })
}

//PERFIL AUNTENTICADO

export async function getProfile() {
    return api("/users/profile")
}

//LOGOUT

export function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
}