import { Resolution, Video } from "../types/video.types";

export const db: { videos: Video[] } = {
    videos: [
        {
            id: 1,
            title: "First Video",
            author: "John Sina",
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: "2026-03-06T17:34:48.233Z",
            publicationDate: "2026-03-07T17:34:48.233Z",
            availableResolutions: [Resolution.P144],
        },
        {
            id: 2,
            title: "Second Video",
            author: "John NoSina",
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: "2026-04-06T17:34:48.233Z",
            publicationDate: "2026-04-07T17:34:48.233Z",
            availableResolutions: [Resolution.P144],
        },
    ],
};
