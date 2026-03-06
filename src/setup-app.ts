import express, { Express } from "express";
import { videosRoutes } from "./routes/videos.routes";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    // основной роут
    app.get("/", (req, res) => {
        res.status(200).send("Hello world!");
    });

    app.use("/videos", videosRoutes);

    return app;
};
