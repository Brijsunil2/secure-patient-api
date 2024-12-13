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

const getPersonByHealthCardNumber = `
SELECT person_id
  FROM health_card_info
  WHERE health_card_number = $1;
`;

export {
  insertPerson,
  insertHealthCardInfo,
  insertContactInfo,
  insertMedicalHistory,
  insertPatientVisitInfo,
  getPersonByHealthCardNumber,
  updateContactInfo
};