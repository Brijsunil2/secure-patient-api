import dotenv from "dotenv";
dotenv.config();
import pg from "pg";
import {
  createPersonTable,
  createHealthCardInfoTable,
  createContactInfoTable,
  createMedicalHistoryTable,
  createPatientVisitInfoTable,
} from "../queries/initQueries.js";

const { Pool } = pg;
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;
PGPASSWORD = decodeURIComponent(PGPASSWORD);

export const pool = new Pool({
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
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT version()");
    console.log(res.rows[0].version);
  } catch (err) {
    console.log("Database Error", err);
  } finally {
    client.release();
  }
};

export const initDBTables = async () => {
  const client = await pool.connect();
  try {
    let res = await client.query(createPersonTable);
    res = await client.query(createHealthCardInfoTable);
    res = await client.query(createContactInfoTable);
    res = await client.query(createMedicalHistoryTable);
    res = await client.query(createPatientVisitInfoTable);
  } catch (err) {
    console.log("Database Error", err);
  } finally {
    client.release();
  }
};
