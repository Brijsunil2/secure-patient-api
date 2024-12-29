import { pool } from "../config/dbConfig.js";

const dbQuery = async (query, values) => {
  const client = await pool.connect();

  try {
    const result = await client.query(query, values);

    if (result.rowCount !== 0) {
      return result;
    }
  } catch (err) {
    console.log("Database Error", err);
    res.status(500).json({ message: "Database Error" });
  } finally {
    client.release();
  }

  return null;
};

const insertPerson = `
INSERT INTO person (firstname, lastname, date_of_birth, gender, address)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id;
`;

const insertHealthCardInfo = `
INSERT INTO health_card_info (person_id, health_card_number)
  VALUES ($1, $2);
`;

const insertContactInfo = `
INSERT INTO contact_info (person_id, primary_phone_number, secondary_phone_number, emergency_contact, emergency_contact_relationship, email)
  VALUES ($1, $2, $3, $4, $5, $6);
`;

const updateContactInfo = `
UPDATE contact_info
  SET primary_phone_number = $1, secondary_phone_number = $2, emergency_contact = $3, emergency_contact_relationship = $4, email = $5
  WHERE person_id = $6`;

const insertMedicalHistory = `
INSERT INTO medical_history (person_id, current_medications, allergies, chronic_conditions)
  VALUES ($1, $2, $3, $4);
`;

const insertPatientVisitInfo = `
INSERT INTO patient_visit_info (person_id, reason_for_visit, patient_pain_rating, symptoms)
  VALUES ($1, $2, $3, $4);
`;

const getPersonIDByHealthCardNumber = async (healthCardNumber) => {
  const query = `
  SELECT person_id
    FROM health_card_info
    WHERE health_card_number = $1;
  `;

  const result = await dbQuery(query, [healthCardNumber]);
  return result.rowCount !== 0 ? result.rows[0].id : null;
};

const getPersonByID = `
SELECT *
  FROM person
  WHERE id = $1
`;

const getPersonInfoByID = `
SELECT
  p.id AS person_id,
  p.firstname,
  p.lastname,
  p.date_of_birth,
  p.gender,
  p.address,
  h.health_card_number,
  c.primary_phone_number,
  c.secondary_phone_number,
  c.emergency_contact,
  c.emergency_contact_relationship,
  c.email 
FROM person p
LEFT JOIN health_card_info h ON p.id = h.person_id
LEFT JOIN contact_info c ON p.id = c.person_id
WHERE p.id = $1;
`;

const getPersonInfoByHealthCardNumber = async (healthCardNumber) => {
  const query = `
  SELECT
    p.id AS person_id,
    p.firstname,
    p.lastname,
    p.date_of_birth,
    p.gender,
    p.address,
    h.health_card_number,
    c.primary_phone_number,
    c.secondary_phone_number,
    c.emergency_contact,
    c.emergency_contact_relationship,
    c.email 
  FROM person p
  LEFT JOIN health_card_info h ON p.id = h.person_id
  LEFT JOIN contact_info c ON p.id = c.person_id
  WHERE h.health_card_number = $1;
  `;

  const result = await dbQuery(query, [healthCardNumber]);

  return result.rowCount !== 0 ? result.rows[0] : null;
};

export {
  insertPerson,
  insertHealthCardInfo,
  insertContactInfo,
  insertMedicalHistory,
  insertPatientVisitInfo,
  getPersonIDByHealthCardNumber,
  updateContactInfo,
  getPersonByID,
  getPersonInfoByID,
  getPersonInfoByHealthCardNumber,
};

// {
//   patientInfo: {
//     healthCardInfo: { healthCardNumber: '3732-743-243-HS' },
//     firstName: 'John',
//     lastName: 'Doe',
//     dateOfBirth: '2024-12-10',
//     gender: 'Male',
//     address: '2401 City Park Dr',
//     contactInformation: {
//       primaryPhoneNumber: '+1 505-586-5454',
//       secondaryPhoneNumber: '+1 455-555-5545',
//       emergencyContact: '+1 543-543-5345',
//       emergencyContactRelationship: 'Necessitatibus itaqu',
//       email: '123john@test.ca'
//     },
//     locked: false
//   },
//   visitInfo: {
//     visitInfo: {
//       reasonForVisit: '',
//       patientPainRating: 0,
//       symptoms: [],
//       medicalHistory: [Object]
//     },
//     reasonForVisit: 'hfdgf',
//     patientPainRating: 3,
//     symptoms: [ 'joe' ],
//     medicalHistory: {
//       currentMedications: [Array],
//       allergies: 'gfdg',
//       chronicConditions: 'gdfg'
//     }
//   },
//   patientAcknowledgement: '2024-12-19T01:43:03.695Z'
// }
