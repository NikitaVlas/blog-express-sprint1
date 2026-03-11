import express from "express";
import { videosRoutes } from "./routes/videos.routes";
import { testingRoutes } from "./routes/testing.routes";

type AppRequest = {
  body?: unknown;
  params: Record<string, string | undefined>;
};

type AppResponse = {
  status: (statusCode: number) => AppResponse;
  send: (body: string) => unknown;
};

type AppInstance = {
  use: (...args: any[]) => unknown;
  get: (path: string, handler: (req: AppRequest, res: AppResponse) => unknown) => unknown;
};

export const RouterPaths = {
  videos: "/videos",
  testing: "/testing",
};

export const setupApp = (app: AppInstance) => {
  app.use(express.json());

  app.get("/", (_req: AppRequest, res: AppResponse) => {
    res.status(200).send("Hello world!");
  });

  app.use(RouterPaths.videos, videosRoutes);
  app.use(RouterPaths.testing, testingRoutes);

  return app;
};
