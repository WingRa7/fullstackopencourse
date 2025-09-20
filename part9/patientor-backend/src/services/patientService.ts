import patients from "../../data/patients";
import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types";

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

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((p) => p.id === id);
  return entry;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, id: string): Entry => {
  const patient = findById(id);
  if (!patient) {
    throw new Error();
  }
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient?.entries.push(newEntry as Entry);
  return newEntry as Entry;
};

export default {
  getNonSensitiveEntries,
  findById,
  addPatient,
  addEntry,
};
