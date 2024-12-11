export const createPersonTable = `
CREATE TABLE IF NOT EXISTS person (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(20) NOT NULL,
  address TEXT NOT NULL
);
`;

export const createHealthCardInfoTable = `
CREATE TABLE IF NOT EXISTS health_card_info (
  id SERIAL PRIMARY KEY,
  person_id INTEGER REFERENCES person(id) ON DELETE CASCADE,
  health_card_number VARCHAR(15) UNIQUE NOT NULL
);
`;

export const createContactInfoTable = `
CREATE TABLE IF NOT EXISTS contact_info (
  id SERIAL PRIMARY KEY,
  person_id INTEGER REFERENCES person(id) ON DELETE CASCADE,
  primary_phone_number VARCHAR(20) NOT NULL,
  secondary_phone_number VARCHAR(20),
  emergency_contact VARCHAR(20) NOT NULL,
  emergency_contact_relationship VARCHAR(20),
  email VARCHAR(20)
);
`;

export const createMedicalHistoryTable = `
CREATE TABLE IF NOT EXISTS medical_history (
  id SERIAL PRIMARY KEY,
  person_id INTEGER REFERENCES person(id) ON DELETE CASCADE,
  current_medications TEXT,
  allergies TEXT,
  chronic_conditions TEXT
);
`;

export const createPatientVisitInfoTable = `
CREATE TABLE IF NOT EXISTS patient_visit_info (
  id SERIAL PRIMARY KEY,
  person_id INTEGER REFERENCES person(id) ON DELETE CASCADE,
  reason_for_visit TEXT NOT NULL,
  patient_pain_rating INTEGER NOT NULL,
  symptoms TEXT
);
`;