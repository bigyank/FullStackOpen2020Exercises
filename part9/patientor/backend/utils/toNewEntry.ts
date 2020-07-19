/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { NewPatientEntry, Gender } from "../src/types";

const toNewPatientsEntry = (object: any): NewPatientEntry => {
  return {
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    name: parseString(object.name),
    occupation: parseString(object.occupation),
    ssn: parseString(object.ssn),
  };
};

const parseString = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error("Invalid or Missing Content");
  }
  return text;
};

const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isDate(date) || !isString(date)) {
    throw new Error("date is missing or invalid");
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Invalid Gender");
  }
  return gender;
};

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

export default toNewPatientsEntry;
