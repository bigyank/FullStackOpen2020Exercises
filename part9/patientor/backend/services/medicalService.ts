import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

import {
  diagnoses,
  NonSensitivePatientsEntry,
  NewPatientEntry,
} from "../src/types";
import diagnosesData from "../database/diagnoses";
import patientsData from "../database/patients";

const getDiagnosesData = (): Array<diagnoses> => {
  return diagnosesData;
};

const getPatientsData = (): Array<NonSensitivePatientsEntry> => {
  return patientsData.map((data) => _.omit(data, "ssn"));
};

const addPatientsData = (
  patientEntry: NewPatientEntry
): NonSensitivePatientsEntry => {
  const newEntry = {
    id: uuidv4(),
    ...patientEntry,
  };
  patientsData.push(newEntry);
  return _.omit(newEntry, "ssn");
};

export default {
  getDiagnosesData,
  getPatientsData,
  addPatientsData,
};
