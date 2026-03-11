import { Router } from "express";
import { db } from "../db/database.db";
import {
    Resolution,
    UpdateVideoInputModel,
} from "../types/video.types";
import {
    sendValidationError,
    validateCreateInput,
    validateUpdateInput,
} from "../drivers/validation/inputValidation";

type RouteRequest = {
    body: unknown;
    params: Record<string, string | undefined>;
};

type RouteResponse = {
    status: (statusCode: number) => RouteResponse;
    json: (body: unknown) => unknown;
    sendStatus: (statusCode: number) => unknown;
};

type CreateVideoBody = {
    title: string;
    author: string;
    availableResolutions: Resolution[];
};

export const videosRoutes = Router();

let nextVideoId = 1;

videosRoutes
    .get("/", (_req: RouteRequest, res: RouteResponse) => {
        res.status(200).json(db.videos);
    })

    .get("/:id", (req: RouteRequest, res: RouteResponse) => {
        const id = Number(req.params.id);
        const video = db.videos.find((video) => video.id === id);

        if (!video) {
            return res.sendStatus(404);
        }

        return res.status(200).json(video);
    })

    .delete("/:id", (req: RouteRequest, res: RouteResponse) => {
        const id = Number(req.params.id);
        const index = db.videos.findIndex((video) => video.id === id);

        if (index === -1) {
            return res.sendStatus(404);
        }

        db.videos.splice(index, 1);
        return res.sendStatus(204);
    })

    .put("/:id", (req: RouteRequest, res: RouteResponse) => {
        const id = Number(req.params.id);
        const video = db.videos.find((video) => video.id === id);

        if (!video) {
            return res.sendStatus(404);
        }

        const errors = validateUpdateInput(req.body);
        if (errors.length > 0) {
            return sendValidationError(res, errors);
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

    .post("/", (req: RouteRequest, res: RouteResponse) => {
        const errors = validateCreateInput(req.body);
        if (errors.length > 0) {
            return sendValidationError(res, errors);
        }

        const input = req.body as CreateVideoBody;
        const now = new Date();
        const publicationDate = new Date(now);
        publicationDate.setDate(publicationDate.getDate() + 1);

        const newVideo = {
            id: nextVideoId++,
            title: input.title.trim(),
            author: input.author.trim(),
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: now.toISOString(),
            publicationDate: publicationDate.toISOString(),
            availableResolutions: input.availableResolutions,
        };

        db.videos.push(newVideo);
        return res.status(201).json(newVideo);
    });
