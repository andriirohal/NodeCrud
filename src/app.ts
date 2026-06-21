import express, { Request, Response } from "express";
import cors from "cors";

import { router } from "./routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", router);

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});