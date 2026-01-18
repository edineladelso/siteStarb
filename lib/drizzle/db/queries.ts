import { eq } from "drizzle-orm";
import { db } from "./index";
import { postsTable, usersTable } from "./schema";

// Buscar usuarios
export async function buscarTodosUsuarios() {
  return await db.select().from(usersTable);
}

export async function buscarTodosPosts() {
  return await db.select().from(postsTable);
}

export async function buscarUsuarioPorId(id: number) {
  return await db.select().from(usersTable).where(eq(usersTable.id, id));
}

export async function buscarPostPorUsuariooId(userId: number) {
  return await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.userId, userId));
}