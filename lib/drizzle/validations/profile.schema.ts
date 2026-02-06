import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { profilesTable } from "../db/schema/profile";
import z from "zod";

export const insertProfileSchema = createInsertSchema(profilesTable, {
  nome: z.string().min(1).max(200),
  apelido: z.string().min(3),
  idade: z.number().int().nonoptional(),
  avatar_url: z.string().url(),
}).omit({
  id: true,
  createdAt: true,
  updateAt: true,
})

export const selectProfileSchema = createSelectSchema(profilesTable);

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type SelectProfile = z.infer<typeof selectProfileSchema>;