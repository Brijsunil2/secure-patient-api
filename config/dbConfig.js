import dotenv from "dotenv";
dotenv.config();
import pg from "pg";

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;
PGPASSWORD = decodeURIComponent(PGPASSWORD);

const db = new pg.Client({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: PGPORT,
  ssl: {
    require: true,
  },
});

export const getPgVersion = async () => {
  await db.connect();
  try {
    const res = await db.query("SELECT version()");
    console.log(res.rows[0].version);
  } catch (err) {
    console.log("Database Error", err);
  }
};