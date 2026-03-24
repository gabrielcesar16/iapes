require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")

//BD import
const pool = require("./config/db")

//Route import
const userRoutes = require("./routes/users")

//ANTES DE QUALQUER ROTA AHHHHH!
app.use(express.json())

//Middleware de rota

app.use("/users", userRoutes)

// Middleware
app.use(express.static("public"))
app.use(cors())

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({
        error: "Error intero"
    })
})

//Rota básica
app.get("/", (req, res) =>{
    res.send("API rodando")
})

// BD conn

app.get("/db", async (req, res) => {
    try{
        const result = await pool.query("SELECT NOW()")
        res.json({
            meessage: "Banco conectado",
            time: result.rows[0]
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Error ao conectar no banco"
        })
    }
})



const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})



