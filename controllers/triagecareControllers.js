import asyncHandler from "express-async-handler";

import {
  getPersonIDByHealthCardNumber,
  getPersonByID,
  getContactInfoByPersonID,
  insertPerson
} from "../queries/dbQueries.js";

export const submitTriageCheckIn = asyncHandler(async (req, res) => {
  console.log(req.body)


  res.status(200);
});

export const getPatientInfoByHealthCardNumber = asyncHandler(
  async (req, res) => {
    const healthCardNumber = req.query.healthCardNumber;

    const personID = await getPersonIDByHealthCardNumber(healthCardNumber);
    const patientInfo = await getPersonByID(personID);
    const contactInfo = await getContactInfoByPersonID(personID);

    res.json({ patientInfo, contactInfo });
  }
);
