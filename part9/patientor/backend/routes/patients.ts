import express from "express";
import medicalService from "../services/medicalService";

const router = express.Router();

router.get("/", (_req, res) => {
  const patientsData = medicalService.getPatientsData();
  res.status(200).send(patientsData);
});

export default router;
