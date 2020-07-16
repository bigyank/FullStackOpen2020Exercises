import express from "express";
import { calculateBMI } from "./bmi";
import { calculateExercise } from "./exerciseCalculator";

const app = express();
app.use(express.json());
const PORT = 3001;

app.get("/hello", (_req, res) => {
  res.status(200).send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const { mass, height } = req.query;
    const bmi = calculateBMI(mass, height);
    res.status(200).send(bmi);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

interface bodyInterface {
  dailyExercises: Array<number>;
  target: number;
}

app.get("/exercise", (req, res) => {
  const body = req.body as bodyInterface;

  const { dailyExercises, target } = body;

  const result = calculateExercise(dailyExercises, target);
  res.status(200).send(result);
});

app.listen(PORT, () => {
  console.log("server running on", PORT);
});
