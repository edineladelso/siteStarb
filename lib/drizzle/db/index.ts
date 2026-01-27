import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false,   max: 10,
  idle_timeout: 20,
  connect_timeout: 10, });


// Conexão para migrações
export const migrationClient = postgres(connectionString, { max: 1 });

// Instância do Drizzle
export const db = drizzle(client, {schema});

export type DB = typeof db;