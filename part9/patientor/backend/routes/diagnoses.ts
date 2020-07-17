import express from "express";
import diagonsesService from "../services/medicalService";

const router = express.Router();

router.get("/", (_req, res) => {
  const diagnosesData = diagonsesService.getDiagnosesData();
  res.status(200).send(diagnosesData);
});

export default router;
