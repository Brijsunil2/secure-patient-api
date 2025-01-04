import asyncHandler from "express-async-handler";

import {
  getPersonIDByHealthCardNumber,
  getPersonByID,
} from "../queries/dbQueries.js";

export const submitTriageCheckIn = asyncHandler(async (req, res) => {
  


  res.status(200);
});

export const getPatientInfoByHealthCardNumber = asyncHandler(
  async (req, res) => {
    const healthCardNumber = req.query.healthCardNumber;

    const personID = await getPersonIDByHealthCardNumber(healthCardNumber);
    if (personID) {
      const patientInfo = await getPersonByID(personID);
      res.status(200).json({ patientInfo });
    } else {
      res.status(404).json({ message: "Health card number does not exist."})
    }
  }
);
