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

const insertPerson = async (
  firstname,
  lastname,
  date_of_birth,
  gender,
  address
) => {
  const query = `
  INSERT INTO person (firstname, lastname, date_of_birth, gender, address)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id;
  `;

  const result = await dbQuery(query, [
    firstname,
    lastname,
    date_of_birth,
    gender,
    address,
  ]);
  return result;
};

const insertHealthCardInfo = async (person_id, health_card_info) => {
  const query = `
  INSERT INTO health_card_info (person_id, health_card_number)
    VALUES ($1, $2);
  `;

  const result = await dbQuery(query, [person_id, health_card_info]);
  return result;
};

const insertContactInfo = async () => {
  const query = `
  INSERT INTO contact_info (person_id, primary_phone_number, secondary_phone_number, emergency_contact, emergency_contact_relationship, email)
    VALUES ($1, $2, $3, $4, $5, $6);
  `;

  const result = await dbQuery(query, [
    person_id,
    primary_phone_number,
    secondary_phone_number,
    emergency_contact,
    emergency_contact_relationship,
    email,
  ]);
  return result;
};

const updateContactInfo = async () => {
  const query = `
  UPDATE contact_info
    SET primary_phone_number = $1, secondary_phone_number = $2, emergency_contact = $3, emergency_contact_relationship = $4, email = $5
    WHERE person_id = $6`;

  const result = await dbQuery(query, [
    primary_phone_number,
    secondary_phone_number,
    emergency_contact,
    emergency_contact_relationship,
    email,
    person_id,
  ]);
  return result;
};

const insertMedicalHistory = async () => {
  const query = `
  INSERT INTO medical_history (person_id, current_medications, allergies, chronic_conditions)
    VALUES ($1, $2, $3, $4);
  `;

  const result = await dbQuery(query, [
    person_id,
    current_medications,
    allergies,
    chronic_conditions,
  ]);
  return result;
};

const insertPatientVisitInfo = async () => {
  const query = `
  INSERT INTO patient_visit_info (person_id, reason_for_visit, patient_pain_rating, symptoms)
    VALUES ($1, $2, $3, $4);
  `;

  const result = await dbQuery(query, [
    person_id,
    reason_for_visit,
    patient_pain_rating,
    symptoms,
  ]);
  return result;
};

const getPersonIDByHealthCardNumber = async (healthCardNumber) => {
  const query = `
  SELECT person_id
    FROM health_card_info
    WHERE health_card_number = $1;
  `;

  const result = await dbQuery(query, [healthCardNumber]);
  return result && result.rowCount !== 0 ? result.rows[0].person_id : null;
};

const getPersonByID = async (personID) => {
  const query = `
  SELECT *
    FROM person
    WHERE id = $1
  `;

  const result = await dbQuery(query, [personID]);
  return result && result.rowCount !== 0 ? result.rows[0] : null;
};

const getContactInfoByPersonID = async (personID) => {
  const query = `
  SELECT *
    FROM contact_info
    WHERE person_id = $1
  `;

  const result = await dbQuery(query, [personID]);
  return result && result.rowCount !== 0 ? result.rows[0] : null;
};

const getPersonInfoByID = async (id) => {
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
    WHERE p.id = $1;
  `;

  const result = await dbQuery(query, [id]);
  return result;
};

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

  return result && result.rowCount !== 0 ? result.rows[0] : null;
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
  getContactInfoByPersonID,
};

// {
//   healthCardInfo: { healthCardNumber: '3732-743-243-HS' },
//   patientInfo: {
//     firstName: 'John',
//     lastName: 'Doe',
//     dateOfBirth: '2024-12-11',
//     gender: 'Male',
//     address: '2401 City Park Dr'
//   },
//   contactInfo: {
//     primaryPhoneNumber: '+1 453-453-4543',
//     secondaryPhoneNumber: '',
//     emergencyContact: '+1 534-543-5345',
//     emergencyContactRelationship: '',
//     email: ''
//   },
//   medicalHistory: {
//     currentMedications: [ 'hgfhgf', 'hgfktuhgk' ],
//     allergies: 'vczv',
//     chronicConditions: 'nvcnc'
//   },
//   visitInfo: {
//     reasonForVisit: 'fdsf',
//     painRating: 5,
//     symptoms: [ 'dasdasd', 'asfsagfag' ]
//   },
//   patientAcknowledgement: '2025-01-03T02:12:36.142Z'
// }
