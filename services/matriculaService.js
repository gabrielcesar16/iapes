import prisma from "../config/prisma.js"

const matricular = async (userId, disciplinaId) => {
    try {
        const registro = await prisma.alunoDisciplina.create({
            data: {
                userId,
                disciplinaId
            }
        })

        return registro

    } catch (err) {
        if (err.code === "P2002") {
            throw new console.error("Você já está matriculado nessa disciplina");
            
        }

        throw new Error("Erro ao matricular")
    }

    export default {
        matricular
    }
}