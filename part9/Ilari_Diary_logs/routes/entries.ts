import express from "express";
import diaryService from "../services/diaryService";

const router = express.Router();

router.get("/", (_req, res) => {
  const allEntries = diaryService.getNonSensitiveEntries();
  res.status(200).send(allEntries);
});

export default router;