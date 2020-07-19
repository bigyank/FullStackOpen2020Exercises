import express from "express";
import diaryService from "../services/diaryService";
import toNewDiaryEntry from "../utils/utils";

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
  try {
    const newEntry = toNewDiaryEntry(req.body);
    const newDiaryEntry = diaryService.addEntry(newEntry);
    res.status(201).send(newDiaryEntry);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});
export default router;
