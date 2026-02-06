import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export type roleEnum = "matematica" | "fisica";

export const profilesTable = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  nome: text("nome").notNull(),
  apelido: text("apelido").notNull(),
  idade: integer("idade"),
  avatar_url: text("avatar_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updateAt: timestamp("updated_at").notNull().defaultNow(),
  role: jsonb("role").$type<roleEnum>().notNull(),
});

export const loginTable = pgTable("login_table", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: uuid("user_id") // ← UUID agora
    .notNull()
    .references(() => profilesTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});
