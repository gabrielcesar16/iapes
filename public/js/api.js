const API_URL = "http://localhost:3000"

export default async function api(path, options = {}) {
    const token = localStorage.getItem("token")


    //spread
    const res = await fetch (API_URL + path, {
        cache: "no-store", // O que isso faz?
        headers: {
            "Content-Type": "application/json",
            ...(token && {
                Authorization: "Bearer " + token
            }),
            ...options.headers,
        },
        ...options,
    })

    if (res.status === 401) {
        localStorage.removeItem("token")
        window.location.href = "/pages/index.html"
        throw new Error("Não autorizado")
    }

        const data = await res.json()
        
        if (!res.ok) {
           throw {
            status: res.status,
            ...data
           }
        }

        return data
}

