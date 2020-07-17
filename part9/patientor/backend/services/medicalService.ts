import { diagnoses, NonSensitivePatientsEntry } from "../src/types";
import diagnosesData from "../database/diagnoses";
import patientsData from "../database/patients";

const getDiagnosesData = (): Array<diagnoses> => {
  return diagnosesData;
};

const getPatientsData = (): Array<NonSensitivePatientsEntry> => {
  return patientsData.map(({ id, dateOfBirth, gender, name, occupation }) => ({
    dateOfBirth,
    id,
    gender,
    name,
    occupation,
  }));
};

export default {
  getDiagnosesData,
  getPatientsData,
};
