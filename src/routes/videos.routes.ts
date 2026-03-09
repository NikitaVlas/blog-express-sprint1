import {Request, Response, Router} from "express";
import {db} from "../db/database.db";
import {UpdateVideoInputModel} from "../types/video.types";

export const videosRoutes = Router();

let nextVideoId = 1;

videosRoutes
    .get("/", (_req: Request, res: Response) => {
        res.status(200).json(db.videos);
    })

    .get("/:id", (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const video = db.videos.find((video) => video.id === id);

        if (!video) {
            return res.sendStatus(404);
        }

        return res.status(200).json(video);
    })

    .delete("/:id", (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const index = db.videos.findIndex((video) => video.id === id);

        if (index === -1) {
            return res.sendStatus(404);
        }

        db.videos.splice(index, 1);
        return res.sendStatus(204);
    })

    .put("/:id", (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const video = db.videos.find((video) => video.id === id);

        if (!video) {
            return res.sendStatus(404);
        }

        const input = req.body as UpdateVideoInputModel;
        video.title = input.title.trim();
        video.author = input.author.trim();
        video.availableResolutions = input.availableResolutions;
        video.canBeDownloaded = input.canBeDownloaded;
        video.minAgeRestriction = input.minAgeRestriction;
        video.publicationDate = input.publicationDate;

        return res.sendStatus(204);
    })

    .post("/", (req: Request, res: Response) => {
        const input = req.body;
        const now = new Date();

        const newVideo = {
            id: nextVideoId++,
            title: input.title.trim(),
            author: input.author.trim(),
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: now.toISOString(),
            publicationDate: input.publicationDate,
            availableResolutions: input.availableResolutions,
        };

        db.videos.push(newVideo);
        return res.status(201).json(newVideo);
    });
