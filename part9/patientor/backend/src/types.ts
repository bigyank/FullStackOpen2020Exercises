export interface diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  NonBianary = "nonbinary",
}

export interface patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitivePatientsEntry = Omit<patients, "ssn">;

export type NewPatientEntry = Omit<patients, "id">;
