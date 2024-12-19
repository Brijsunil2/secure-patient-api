import asyncHandler from "express-async-handler";
import { pool } from "../config/dbConfig.js";
import { getPersonInfoByHealthCardNumber } from "../queries/dbQueries.js";

export const submitTriageCheckIn = asyncHandler(async (req, res) => {
  const checkInData = req.body;

  console.log(checkInData);
});

export const getPatientInfoByHealthCardNumber = asyncHandler(
  async (req, res) => {
    const healthCardNumber = req.query.healthCardNumber;
    console.log(healthCardNumber);

    const client = await pool.connect();
    try {
      const result = await client.query(getPersonInfoByHealthCardNumber, [
        healthCardNumber,
      ]);
      if (result.rowCount !== 0) {
        res.json({ patientInfo: result.rows[0] });
      } else {
        res.json({ patientInfo: null });
      }
    } catch (err) {
      console.log("Database Error", err);
      res.status(500).json({ message: "Database Error" });
    } finally {
      client.release();
    }
  }
);
