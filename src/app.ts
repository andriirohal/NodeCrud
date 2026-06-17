import express from "express";
import cors from "cors";

export const app = express();

import { router } from "./routes";

app.use(cors());
app.use(express.json());

app.use("/products", router);

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});