import express from "express";
import { videosRoutes } from "./routes/videos.routes";
import { testingRoutes } from "./routes/testing.routes";

export const RouterPaths = {
  videos: "/videos",
  testing: "/testing",
};

export const setupApp = (app: express.Application) => {
  app.use(express.json());

  app.get("/", (_req, res) => {
    res.status(200).send("Hello world!");
  });

  app.use(RouterPaths.videos, videosRoutes);
  app.use(RouterPaths.testing, testingRoutes);

  return app;
};
