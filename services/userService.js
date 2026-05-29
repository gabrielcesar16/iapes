//import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const login = async ({ email, password }) => {

    //Busca o usuario
    const user = await prisma.user.findUnique({
        where: { email }
    })

    //Verificação de existencia
    if (!user){
        throw new Error("Usuario nao econtrado")
    }

    //Buscando senha
    const validPassword = await bcrypt.compare(password, user.password)

    //Validação de senha
    if (!validPassword) {
        throw new Error("Senha invalida")
    }
    
    //Gerar token
    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    )
    // Retorno com o token gerado e o email e senha
    return {
        token,
        user: {
            id: user.id,
            email: user.email 
        }
    }
}

const register = async ({ email, password }) => {

    //verifica se usuario existe
    const existingUser = await prisma.user.findUnique({
        where : { email }
    })

    if (existingUser) {
        throw new Error("Usuário já existe")
    }

    //hashar a senha
    const hashedPassword =  await bcrypt.hash(password, 10)

    //cria user
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
    })

    //retorno
    return {
        id: user.id,
        email: user.email

    }
}

 const getProfile = async (userId) => {

    const user = await prisma.user.findUnique({
        where: { id : userId},
        select: {
            id: true,
            email: true
        }
    })

    if (!user){
        throw new Error("Usuário não encontrado")
    }

    return user

}

const updateProfile = async (userId, { email, password }) => {
    
    const user = await prisma.user.findUnique({
        where: { id: userId }
    })

    if (!user) {
        throw new Error("Usuário não econtrado")
    }

    // Verificar se o email já está em uso por outro usuario

    if ( email && email !== user.email) {
        const emailInUse = await prisma.user.findUnique({
            where: { email }
        })
        if (emailInUse) {
            throw new Error("Email já está em uso")
        }
    }

    const data = {}

    if (email) data.email = email
    if (password) data.password = await bcrypt.hash(password, 10)
    
    const updated = await prisma.user.update({
        where: { id: userId },
        data,
        select: {
            id: true,
            email: true
        }
    })

    return updated
}

export default {
    login,
    register,
    getProfile,
    updateProfile
}