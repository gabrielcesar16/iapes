const pool = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const prisma = require("../config/prisma")

exports.login = async ({ email, password }) => {

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

exports.register = async ({ email, password }) => {

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

exports.getProfile = async (userId) => {

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