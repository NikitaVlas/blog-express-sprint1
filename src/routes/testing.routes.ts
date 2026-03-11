import { Router } from "express";
import { db } from "../db/database.db";

type TestingRequest = {
  body?: unknown;
  params?: Record<string, string | undefined>;
};

type TestingResponse = {
  sendStatus: (statusCode: number) => unknown;
};

export const testingRoutes = Router();

testingRoutes.delete("/all-data", (_req: TestingRequest, res: TestingResponse) => {
  db.videos = [];
  return res.sendStatus(204);
});
