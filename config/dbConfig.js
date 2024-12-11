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

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;
PGPASSWORD = decodeURIComponent(PGPASSWORD);

export const db = new pg.Client({
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

export const initDBTables = async () => {
  try {
    let res = await db.query(createPersonTable);
    res = await db.query(createHealthCardInfoTable);
    res = await db.query(createContactInfoTable);
    res = await db.query(createMedicalHistoryTable);
    res = await db.query(createPatientVisitInfoTable);
  } catch (err) {
    console.log("Database Error", err);
  } 
};
