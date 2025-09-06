import patients from "../../data/patients";
import { NonSensitivePatient, Patient } from "../types";
import { v1 as uuid } from "uuid";

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: Patient) => {
  const newPatient = {
    id: uuid(),
    name: entry.name,
    dateOfBirth: entry.dateOfBirth,
    ssn: entry.ssn,
    gender: entry.gender,
    occupation: entry.occupation,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitiveEntries,
  addPatient,
};
