import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 3001;

app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.status(200).send("pong");
});

app.listen(PORT, () => {
  console.log("server running on port:", PORT);
});
