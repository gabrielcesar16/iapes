import express from 'express'
import prisma from "../config/prisma.js"

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        //console.log("ROTA DISCIPLINAS OK")
        const disciplinas = await prisma.disciplina.findMany({
            orderBy: { semestre: "asc"}
        })
        res.json(disciplinas)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Erro ao buscar disciplinas"
        })
    }
})

export default router