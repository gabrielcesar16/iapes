import prisma from "../config/prisma.js";

const matricular = async (userId, disciplinaId) => {
    return await prisma.alunoDisciplina.create({
        data: { 
            userId, 
            disciplinaId
        }
    })
}

const cancelarMatricula = async (userId, disciplinaId) => {
    return await prisma.alunoDisciplina.delete({
        where: {
            userId_disciplinaId: {
                userId,
                disciplinaId
            }
        }
    })
}

const getMinhasMatriculas = async (userId) => {
    return await prisma.alunoDisciplina.findMany({
        where: {
            userId
        },
        include: {
            disciplina: {
                select: {
                    nome: true,
                    cargaHoraria: true,
                    semestre: true
                }
            }
        }
    })
}

export default {
    matricular,
    cancelarMatricula,
    getMinhasMatriculas
}