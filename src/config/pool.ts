import { Pool } from "pg";

export const pool = new Pool({
  user: "app_owner",
  host: "localhost",
  password: "password",
  database: "products_db",
  port: 5432  
});