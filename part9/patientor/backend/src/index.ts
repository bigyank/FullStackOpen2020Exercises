import express from "express";
import cors from "cors";
import diagnosesRouter from "../routes/diagnoses";
import patientsRouter from "../routes/patients";

const app = express();
app.use(cors());
const PORT = 3001;

app.use(express.json());

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.get("/api/ping", (_req, res) => {
  res.status(200).send("pong");
});

app.listen(PORT, () => {
  console.log("server running on port:", PORT);
});
