import asyncHandler from "express-async-handler";

import {
  getPersonInfoByHealthCardNumber,
  getPersonIDByHealthCardNumber,
} from "../queries/dbQueries.js";

export const submitTriageCheckIn = asyncHandler(async (req, res) => {
  console.log(req.body)
  const healthCardNumber = req.body.patientInfo.healthCardInfo.healthCardNumber;
  const patientInfo = req.body.patientInfo;
  const contactInfo = req.body.patientInfo.contactInformation;
  const visitInfo = req.body.visitInfo;

  const personID = getPersonIDByHealthCardNumber(healthCardNumber);


  res.status(200);
});

export const getPatientInfoByHealthCardNumber = asyncHandler(
  async (req, res) => {
    const healthCardNumber = req.query.healthCardNumber;

    const patientInfo = await getPersonInfoByHealthCardNumber(healthCardNumber);
    res.json({ patientInfo: patientInfo });
  }
);
