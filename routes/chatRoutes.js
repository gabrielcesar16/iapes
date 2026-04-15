import express from "express"
import { chat } from "../controllers/chatController.js"
import authMiddleware from "../middlewares/auth.js"

const router = express.Router()

router.post("/", authMiddleware, chat)

export default router

