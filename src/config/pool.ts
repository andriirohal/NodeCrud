import { Pool } from "pg";

const PORT = Number(process.env.PGPORT);

export const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: Number.isFinite(PORT) ? PORT : 5432
});