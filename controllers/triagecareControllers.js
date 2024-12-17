import asyncHandler from "express-async-handler";
import { pool } from "../config/dbConfig.js";

export const submitTriageCheckIn = asyncHandler(async (req, res) => {
  const checkInData = req.body;

  console.log(checkInData);
});

export const getPatientInfoByHealthCardNumber = asyncHandler(
  async (req, res) => {
    const healthCardNumber = req.query.healthCardNumber;

    console.log(healthCardNumber);
  }
);
