import asyncHandler from "express-async-handler";
import { pool } from "../config/dbConfig.js";
import {
  getPersonInfoByHealthCardNumber,
  insertPerson,
} from "../queries/dbQueries.js";

export const submitTriageCheckIn = asyncHandler(async (req, res) => {
  const patientInfo = req.body.patientInfo;
  const contactInfo = req.body.patientInfo.contactInfo;
  const visitInfo = req.body.visitInfo;
  const client = await pool.connect();

  try {
    let result = await client.query(getPersonInfoByHealthCardNumber, [
      patientInfo.healthCardInfo.healthCardNumber,
    ]);

    if (result.rowCount === 0) {
      result = await client.query(insertPerson, [
        patientInfo.firstName,
        patientInfo.lastName,
        patientInfo.dateOfBirth,
        patientInfo.gender,
        patientInfo.address,
      ]);
      console.log(result);
    }

    res.status(200);
  } catch (err) {
    console.log("Database Error", err);
    res.status(500).json({ message: "Database Error" });
  } finally {
    client.release();
  }
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
