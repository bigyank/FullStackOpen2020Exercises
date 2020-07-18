import express from "express";
import diaryService from "../services/diaryService";

const router = express.Router();

router.get("/", (_req, res) => {
  const allEntries = diaryService.getNonSensitiveEntries();
  res.status(200).send(allEntries);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const singleEntry = diaryService.findById(Number(id));
  if (!singleEntry) {
    res.sendStatus(400);
  } else {
    res.status(200).send(singleEntry);
  }
});

router.post("/", (req, res) => {
  const { date, weather, visibility, comment } = req.body;

  const newDiaryEntry = diaryService.addEntry({
    date,
    weather,
    visibility,
    comment,
  });

  res.status(201).send(newDiaryEntry);
});
export default router;
