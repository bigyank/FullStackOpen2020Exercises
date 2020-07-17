export interface diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export interface patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NonSensitivePatientsEntry = Omit<patients, "ssn">;
