import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (_req, res) => {
  const diaryLogs = await axios.get("http://localhost:4000/data");
  res.status(200).send(diaryLogs.data);
});

export default router;
