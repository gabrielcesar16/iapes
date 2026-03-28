require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()


//BD import
//const pool = require("./config/db")

//ANTES DE QUALQUER ROTA E MIDDLEWARE AHHHHH! (Algo a ver com BODY PARSER?pesquisar depois)
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// Middleware
app.use(cors())

//STATIC vem depois do middleware, mais antes de  qualquer rota
app.use(express.static("public"))

//Route import
const userRoutes = require("./routes/users")
app.use("/users", userRoutes)

//Rota básica
app.get("/", (req, res) =>{
    res.send("API rodando")
})

//Erro handler por ultimo depois de todas as rotas e middlewares
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({
        error: "Error interno generalizado"
    })
})



const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})






// BD conn
/*
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
*/



