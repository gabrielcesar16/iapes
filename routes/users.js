
const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth")


const userController = require ("../controllers/userController")
router.post("/login", userController.login)
router.post("/register", userController.register)
router.get("/profile", authMiddleware, userController.getProfile)

router.post("/", (req, res) => {
    console.log("REGISTER")
})

router.post("/login", (req, res) => {
    console.log("LOGIN")
})

router.get("/profile", (req, res) => {
    console.log("PROFILE")
})



module.exports = router

/*
const express = require("express")
const router = express.Router()
const pool = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const auth = require("../middlewares/auth")


//LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        )

        if (result.rows.length === 0){
            return res.status(400).json({
                error: "Recurso não encontrado"
            })
        }

        const user = result.rows[0]

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return res.status(400).json({
                error: "Senha inválida"
            })
        }

        const token = jwt.sign( 
            { id: user.id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN}
        )

        res.json({ token })

    } catch (err) {
        
        res.status(500).json({
            error: "Erro no login"
        })

    }
})

//ROTA PROTEGIDA
router.get("/profile", auth, async (req, res) => {
    const userId = req.userId

    const result = await pool.query(
        "SELECT id, email FROM users WHERE id = $1"
        [userId]
    )

    res.json(result.row[0])
})

//POST, CRIAR USUARIO
router.post("/", async (req, res) => {
    const { email, password } = req.body

    try{

        //hasha a senha
        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hashedPassword]
        )
        
        res.status(201).json(result.rows[0])
    } catch (err) {
        console.error(err)

        // erro de email duplo, codigo 23505 = unique violation
        if (err.code == "23505"){
            return res.status(400).json({
                error: "Email já existe"
            })
        }

        res.status(500).json({
            error: err.message
        })
    }

})

//READ ALL, Listar todos os usuários
router.get("/", async (req, res) => {
    try{
        const result = await pool.query("SELECT * FROM users")
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({
            error: "Error ao buscasr usuários"
        })
    }
})

//READ ONE, Lista usuário em específico
router.get("/:id", async (req, res) => {
    
    const { id } = req.params

    try{
        const result = await pool.query(
            "SELECT * FROM users WHERE id = $1",
            [id]
        )

        if (result.rows.length === 0){
            return res.status(404).json({
                error: "Usuário não encontrado"
            })
        }
        res.json(result.rows[0])

    } catch {
        res.status(500).json({
            error: "Erro ao buscar usuários"
        })
    }
})

// UPDATE, atualizar usuario
router.put("/:id", async (req, res) => {
    
    const { id } = req.params
    const { email, password } = req.body

    try{
        const result = await pool.query(
            "UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING *",
            [email, password, id]
        )

        if (result.row.length === 0) {
            return res.status(404).json({
                error: "Usuário não econtrado"
            })
        }

        res.json(result.rows[0])

    } catch {
        res.status(500).json({
            error: "Erro ao atualizar usuário"
        })
    }
})

// DELETE, deletar usuário
router.delete("/:id", async (req, res) => {

    const { id } = req.params

    try {

      const result = await pool.query(
        "DELETE FROM useres WHERE id = $1 RETURNING *",
        [id]
      )

      if (result.row.length === 0){
        return res.status(404).json({
            error: "Usuário não encontrado"
        })
      }

    } catch {

        res.status(500).json({
            error: "Erro ao deletar usuário"
        })
        
    }
})

module.exports = router

*/
