
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../db/schema'

const connectionString = process.env.DATABASE_URL!

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client, { schema });

// Funções auxiliares para consultas comuns

export async function obterTodosOsLivros() {
  return db.query.livros.findMany()
}

export async function obterLivroPorId(id: number) {
  return db.query.livros.findFirst({
    where: (livros, { eq }) => eq(livros.id, id),
  })
}

export async function obterTodoSoftware() {
  return db.query.softwares.findMany()
}

export async function obterSoftwarePorId(id: number) {
  return db.query.softwares.findFirst({
    where: (softwares, { eq }) => eq(softwares.id, id),
  })
}

export async function obterTodosProjetos() {
  return db.query.projetos.findMany()
}

export async function obterProjetoPorId(id: number) {
  return db.query.projetos.findFirst({
    where: (projetos, { eq }) => eq(projetos.id, id),
  })
}

export async function obterUsuarioPorEmail(email: string) {
  return db.query.usuarios.findFirst({
    where: (usuarios, { eq }) => eq(usuarios.email, email),
  })
}

export async function obterAutorPorId(id: number) {
  return db.query.autores.findFirst({
    where: (autores, { eq }) => eq(autores.id, id),
  })
}

export async function obterTodoAutores() {
  return db.query.autores.findMany({
    where: (autores, { eq }) => eq(autores.ativo, true),
  })
}
        