import { Router } from "express";
import { db } from "../db/database.db";
import { UpdateVideoInputModel } from "../types/video.types";
import {
    sendValidationError,
    validateCreateInput,
    validateUpdateInput,
} from "../drivers/validation/inputValidation";

export const videosRoutes = Router();

let nextVideoId = 1;

videosRoutes
    .get("/", (_req, res) => {
        res.status(200).json(db.videos);
    })

    .get("/:id", (req, res) => {
        const id = Number(req.params.id);
        const video = db.videos.find((video) => video.id === id);

        if (!video) {
            return res.sendStatus(404);
        }

        return res.status(200).json(video);
    })

    .delete("/:id", (req, res) => {
        const id = Number(req.params.id);
        const index = db.videos.findIndex((video) => video.id === id);

        if (index === -1) {
            return res.sendStatus(404);
        }

        db.videos.splice(index, 1);
        return res.sendStatus(204);
    })

    .put("/:id", (req, res) => {
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

    .post("/", (req, res) => {
        const errors = validateCreateInput(req.body);
        if (errors.length > 0) {
            return sendValidationError(res, errors);
        }

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
