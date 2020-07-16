import express from "express";
import cors from "cors";
import diaryEntries from "../routes/entries";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.use("/api/entries", diaryEntries);

app.get("/ping", (_req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
