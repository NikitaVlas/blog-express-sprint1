import { Router } from "express";
import { db } from "../db/database.db";

export const testingRoutes = Router();

testingRoutes.delete("/all-data", (_req, res) => {
  db.videos = [];
  return res.sendStatus(204);
});
