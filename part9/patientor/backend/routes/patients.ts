import express from "express";
import medicalService from "../services/medicalService";
import toNewPatientsEntry from "../utils/toNewEntry";

const router = express.Router();

router.get("/", (_req, res) => {
  const patientsData = medicalService.getPatientsData();
  res.status(200).send(patientsData);
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientsEntry(req.body);
    const addedPatient = medicalService.addPatientsData(newPatientEntry);
    res.status(201).send(addedPatient);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

export default router;
