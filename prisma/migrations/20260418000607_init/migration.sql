-- CreateEnum
CREATE TYPE "StatusMatricula" AS ENUM ('cursando', 'aprovado', 'reprovado');

-- CreateTable
CREATE TABLE "Disciplina" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cargaHoraria" INTEGER NOT NULL,
    "semestre" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlunoDisciplina" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "disciplinaId" INTEGER NOT NULL,
    "faltas" INTEGER NOT NULL DEFAULT 0,
    "nota" DOUBLE PRECISION,
    "status" "StatusMatricula" NOT NULL DEFAULT 'cursando',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AlunoDisciplina_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AlunoDisciplina_userId_idx" ON "AlunoDisciplina"("userId");

-- CreateIndex
CREATE INDEX "AlunoDisciplina_disciplinaId_idx" ON "AlunoDisciplina"("disciplinaId");

-- CreateIndex
CREATE UNIQUE INDEX "AlunoDisciplina_userId_disciplinaId_key" ON "AlunoDisciplina"("userId", "disciplinaId");

-- AddForeignKey
ALTER TABLE "AlunoDisciplina" ADD CONSTRAINT "AlunoDisciplina_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunoDisciplina" ADD CONSTRAINT "AlunoDisciplina_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("id") ON DELETE CASCADE ON UPDATE CASCADE;
