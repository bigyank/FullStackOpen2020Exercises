import express from "express";
import cors from "cors";
import diaryRouter from "../routes/diaries";

const app = express();
app.use(cors());
const PORT = 3001;

app.use(express.json());

app.use("/api/diaries", diaryRouter);

app.get("/api/ping", (_req, res) => {
  res.status(200).send("pong");
});

app.listen(PORT, () => {
  console.log("server running on port:", PORT);
});
