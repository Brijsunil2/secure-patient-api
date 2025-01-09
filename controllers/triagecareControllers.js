import asyncHandler from "express-async-handler";

import {
  getPersonIDByHealthCardNumber,
  getPersonByID,
  insertPerson,
  insertHealthCardInfo,
  insertContactInfo,
} from "../queries/dbQueries.js";

export const submitTriageCheckIn = asyncHandler(async (req, res) => {
  const data = req.body;
  let result = null;

  // let personID = await getPersonIDByHealthCardNumber(
  //   data.healthCardInfo.healthCardNumber
  // );

  // if (!personID) {
  //   personID = await insertPerson(
  //     data.patientInfo.firstName,
  //     data.patientInfo.lastName,
  //     data.patientInfo.dateOfBirth,
  //     data.patientInfo.gender,
  //     data.patientInfo.address
  //   );

  //   if (personID.rowCount === 1) {
  //     personID = personID.rows[0];
  //   } else {
  //     res.status(500);
  //     return;
  //   }

  //   result = await insertHealthCardInfo(
  //     personID,
  //     data.healthCardInfo.healthCardNumber
  //   );
  // }

  // result = await insertContactInfo(
  //   personID,
  //   data.contactInfo.primaryPhoneNumber,
  //   data.contactInfo.secondaryPhoneNumber,
  //   data.contactInfo.emergencyContact,
  //   data.contactInfo.emergencyContactRelationship,
  //   data.contactInfo.email
  // );

  res.status(201).json({ message: "Patient checkin successful." });
});

export const getPatientInfoByHealthCardNumber = asyncHandler(
  async (req, res) => {
    const healthCardNumber = req.query.healthCardNumber;

    const personID = await getPersonIDByHealthCardNumber(healthCardNumber);
    if (personID) {
      const patientInfo = await getPersonByID(personID);
      res.status(200).json({ patientInfo });
    } else {
      res.status(404).json({ message: "Health card number does not exist." });
    }
  }
);
