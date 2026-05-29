import userService from "../services/userService.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
    try{
        const data = await userService.login(req.body)
        res.json(data)
    } catch (err) {

        if (
            err.message === "Usuário não encontrado" ||
            err.message === "Senha inválida"
        ) {
            //Erro de autenticação
            return res.status(401).json({
                error: err.message
            })
        }

        res.status(400).json({
            error: err.message
        })
    }
}

const register = async (req, res) => {
    try{
        const data = await userService.register(req.body)
        res.status(201).json(data)
        console.log("HEADERS", req.headers)
        console.log("BODY:", req.body)
    } catch (err) {

         if (
            err.message === "Usuário já existe"
        ) {
            //Erro de autenticação
            return res.status(409).json({
                error: err.message
            })
        }

        console.error("REGISTER ERROR:",err)
        res.status(400).json({
            error: err.message
        })
    }
    
}

const getProfile = async (req, res) => {
    try{
        const user = await userService.getProfile(req.userId)
        res.json(user)
    } catch (err){
        res.status(404).json({
            error: err.message
        })
    }
}

const updateProfile = async (req, res) => {
    try {
        const updated = await userService.updateProfile(req.userId, req.body)
        res.json(updated)
    } catch (err) {
        if (err.message === "Usuário não encontrado") {
            return res.status(404).json({
                error : err.message
            })
        }
        if (err.message === "Email já está em uso") {
            return res.status(409).json({
                error : err.message
            })
        }
        res.status(400).json({
            error: err.message
        })
    }
}

export default {
    login,
    register,
    getProfile,
    updateProfile
}
