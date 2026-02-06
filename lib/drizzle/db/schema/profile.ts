// src/lib/drizzle/db/schema/profiles.ts
import {
  pgTable,
  text,
  timestamp,
  uuid
} from "drizzle-orm/pg-core";

export type Role = "admin" | "user";
export type AuthProvider = "email" | "google" | "github";

export const profiles = pgTable("profiles", {
  // O id deve ser o mesmo do auth.users do Supabase
  id: uuid("id").primaryKey(), 
  
  email: text("email").notNull().unique(),
  nome: text("nome").notNull(),
  apelido: text("apelido"),
  avatarUrl: text("avatar_url"),
  
  role: text("role").$type<Role>().notNull().default("user"),
  provider: text("provider").$type<AuthProvider>().notNull().default("email"),
  
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});