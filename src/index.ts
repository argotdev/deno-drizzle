import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { denoDinosaurs } from "./db/schema.ts";

const db = drizzle(Deno.env.get("DATABASE_URL")!);

async function main() {
  const dino: typeof denoDinosaurs.$inferInsert = {
    name: "Denosaur",
    description:
      "A dinosaur that lives in the deno ecosystem. Eats Node.js for breakfast",
  };
  console.log("Dino to insert: ", dino);

  await db.insert(denoDinosaurs).values(dino);
  console.log("New dino created!", dino);

  const dinos = await db.select().from(denoDinosaurs);
  console.log("Getting all dinos from the database: ", dinos);
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
    phone: string | null;
  }[]
  */

  await db
    .update(denoDinosaurs)
    .set({
      description:
        "A dinosaur that lives in the deno ecosystem. Eats Buns for breakfast",
    })
    .where(eq(denoDinosaurs.name, dino.name));
  console.log("Dino info updated!");

  //await db.delete(denoDinosaurs).where(eq(denoDinosaurs.name, dino.name));
  //console.log("Dino deleted!");
}

main();
