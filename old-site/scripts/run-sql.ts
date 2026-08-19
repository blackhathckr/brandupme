import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

/**
 * Applies a .sql file to the Neon database.
 *
 * Neon's HTTP driver sends one statement per request, so the file is split
 * rather than sent whole. The splitter only has to handle SQL this project
 * generates, which never contains a semicolon inside a string literal except
 * as an escaped quote.
 *
 * Everything runs inside main() because tsx transpiles this to CommonJS, which
 * cannot host a top-level await.
 *
 * Usage: pnpm db:seed  /  pnpm db:fixtures
 */

/** Split on semicolons that are not inside a quoted string. */
function statements(sql: string): string[] {
  const out: string[] = [];
  let buf = "";
  let inString = false;

  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];

    if (ch === "'") {
      // '' inside a string is an escaped quote, not a terminator.
      if (inString && sql[i + 1] === "'") {
        buf += "''";
        i++;
        continue;
      }
      inString = !inString;
    }

    if (ch === ";" && !inString) {
      const trimmed = buf.trim();
      if (trimmed) out.push(trimmed);
      buf = "";
      continue;
    }

    buf += ch;
  }

  const tail = buf.trim();
  if (tail) out.push(tail);

  // Comment-only fragments are not worth a round trip.
  return out.filter(
    (s) => !s.split("\n").every((l) => l.trim().startsWith("--") || !l.trim()),
  );
}

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("usage: tsx scripts/run-sql.ts <file.sql>");
    process.exit(1);
  }

  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error(
      "DATABASE_URL is not set. Put your Neon connection string in .env.local.",
    );
    process.exit(1);
  }

  const sql = neon(url);
  const parts = statements(readFileSync(file, "utf-8"));

  console.log(`applying ${parts.length} statements from ${file}`);

  let done = 0;
  for (const statement of parts) {
    try {
      await sql.query(statement);
      done++;
    } catch (err) {
      console.error(`\nfailed on statement ${done + 1}:`);
      console.error(statement.slice(0, 300));
      console.error(err instanceof Error ? err.message : err);
      process.exit(1);
    }
  }

  console.log(`applied ${done} statements`);
}

main();
