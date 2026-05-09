import express from "express"
import authMiddleware from "../middlewares/auth.js"
import matriculaController from "../controllers/matriculaController.js"

const router = express.Router()

router.use(authMiddleware)

router.post("/", matriculaController.matricular)
router.delete("/:disciplinaId", matriculaController.cancelarMatricula)
router.get("/", matriculaController.getMinhasMatriculas)

export default router

