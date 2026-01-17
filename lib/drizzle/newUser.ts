import {InsertPost, InsertUser, postsTable, usersTable} from "@/lib/drizzle/db/schema"
import { db } from "./db/index"

export async function criarUsuario(data:InsertUser) {

  return await db.insert(usersTable).values(data).returning()
}
export async function criarPost(data:InsertPost) {

  return await db.insert(postsTable).values(data).returning()
}