import asyncHandler from "express-async-handler";

import {
  getPersonIDByHealthCardNumber,
  getPersonByID,
  insertPerson,
  insertHealthCardInfo,
  insertContactInfo,
  insertMedicalHistory,
  insertPatientVisitInfo,
} from "../queries/dbQueries.js";

export const submitTriageCheckIn = asyncHandler(async (req, res) => {
  const data = req.body;
  let result = null;

  let personID = await getPersonIDByHealthCardNumber(
    data.healthCardInfo.healthCardNumber
  );

  if (!personID) {
    personID = await registerNewPatient(data);
  }

  await addVisitInfo(personID, data);

  res.status(201).json({ message: "Patient checkin successful." });
});

const registerNewPatient = async (data) => {
  let personID = await insertPerson(
    data.patientInfo.firstName,
    data.patientInfo.lastName,
    data.patientInfo.dateOfBirth,
    data.patientInfo.gender,
    data.patientInfo.address
  );

  if (personID.rowCount === 1) {
    personID = personID.rows[0].id;
  } else {
    res.status(500);
    return null;
  }

  const result = await insertHealthCardInfo(
    personID,
    data.healthCardInfo.healthCardNumber || "NA"
  );

  return personID;
};

const addVisitInfo = async (personID, data) => {
  let result = await insertContactInfo(
    personID,
    data.contactInfo.primaryPhoneNumber,
    data.contactInfo.secondaryPhoneNumber,
    data.contactInfo.emergencyContact,
    data.contactInfo.emergencyContactRelationship,
    data.contactInfo.email
  );

  result = await insertMedicalHistory(
    personID,
    data.medicalHistory.currentMedications,
    data.medicalHistory.allergies,
    data.medicalHistory.chronicConditions
  );

  result = await insertPatientVisitInfo(
    personID,
    data.visitInfo.reasonForVisit,
    data.visitInfo.painRating,
    data.visitInfo.symptoms,
    data.patientAcknowledgement
  );
};

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
