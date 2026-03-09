import {APIErrorResult, FieldError} from "../../types/video.types";

export const isNonEmptyString = (value: unknown): value is string =>
    typeof value === "string" && value.trim().length > 0;

const sendValidationError = (res: Response, errors: FieldError[]) => {
    const body: APIErrorResult = { errorsMessages: errors };
    return res.status(400).json(body);
};