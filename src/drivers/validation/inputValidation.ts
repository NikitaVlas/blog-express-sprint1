import {
    APIErrorResult,
    CreateVideoInputModel,
    FieldError,
    Resolution,
    UpdateVideoInputModel
} from "../../types/video.types";

type ValidationErrorResponse = {
    status: (statusCode: number) => {
        json: (body: APIErrorResult) => unknown;
    };
};

export const isNonEmptyString = (value: unknown): value is string =>
    typeof value === "string" && value.trim().length > 0;

const isValidDateTime = (value: unknown): value is string => {
    if (typeof value !== "string") {
        return false;
    }

    return !Number.isNaN(Date.parse(value));
};

const isResolution = (value: unknown): value is Resolution =>
    typeof value === "string" && Object.values(Resolution).includes(value as Resolution);

const isValidResolutionsArray = (value: unknown): value is Resolution[] =>
    Array.isArray(value) && value.length > 0 && value.every(isResolution);

export const sendValidationError = (res: ValidationErrorResponse, errors: FieldError[]) => {
    const body: APIErrorResult = { errorsMessages: errors };
    return res.status(400).json(body);
};

export const validateCreateInput = (input: unknown): FieldError[] => {
    const errors: FieldError[] = [];
    const value = input as Partial<CreateVideoInputModel> | null;

    if (!value || !isNonEmptyString(value.title) || value.title.length > 40) {
        errors.push({ message: "Invalid title", field: "title" });
    }

    if (!value || !isNonEmptyString(value.author) || value.author.length > 20) {
        errors.push({ message: "Invalid author", field: "author" });
    }

    if (!value || !isValidResolutionsArray(value.availableResolutions)) {
        errors.push({ message: "Invalid availableResolutions", field: "availableResolutions" });
    }

    return errors;
};

export const validateUpdateInput = (input: unknown): FieldError[] => {
    const errors: FieldError[] = [];
    const value = input as Partial<UpdateVideoInputModel> | null;

    if (!value || !isNonEmptyString(value.title) || value.title.length > 40) {
        errors.push({ message: "Invalid title", field: "title" });
    }

    if (!value || !isNonEmptyString(value.author) || value.author.length > 20) {
        errors.push({ message: "Invalid author", field: "author" });
    }

    if (!value || !isValidResolutionsArray(value.availableResolutions)) {
        errors.push({ message: "Invalid availableResolutions", field: "availableResolutions" });
    }

    if (!value || typeof value.canBeDownloaded !== "boolean") {
        errors.push({ message: "Invalid canBeDownloaded", field: "canBeDownloaded" });
    }

    const minAge = value?.minAgeRestriction;
    const isMinAgeValid =
        value &&
        (minAge === null || (typeof minAge === "number" && Number.isInteger(minAge) && minAge >= 1 && minAge <= 18));

    if (!isMinAgeValid) {
        errors.push({ message: "Invalid minAgeRestriction", field: "minAgeRestriction" });
    }

    if (!value || !isValidDateTime(value.publicationDate)) {
        errors.push({ message: "Invalid publicationDate", field: "publicationDate" });
    }

    return errors;
};
