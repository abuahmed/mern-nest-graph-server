declare abstract class HttpError extends Error {
    status: number;
}
export declare class BadRequest extends HttpError {
    constructor(message?: string);
}
export declare class Unauthorized extends HttpError {
    constructor(message?: string);
}
export {};
