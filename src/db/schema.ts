import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const denoDinosaurs = pgTable("deno_dinosaurs", {
  id: serial().primaryKey().notNull(),
  name: text().notNull(),
  description: text().notNull(),
});
