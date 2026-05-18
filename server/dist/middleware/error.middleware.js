"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandler = void 0;
const ApiError_1 = require("../utils/ApiError");
const env_1 = require("../config/env");
const errorHandler = (err, req, res, next) => {
    const statusCode = err instanceof ApiError_1.ApiError ? err.statusCode : 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Server Error',
        // We only expose stack trace in development for security
        stack: env_1.ENV.NODE_ENV === 'production' ? null : err.stack,
    });
};
exports.errorHandler = errorHandler;
const notFound = (req, res, next) => {
    const error = new ApiError_1.ApiError(404, `Not Found - ${req.originalUrl}`);
    next(error);
};
exports.notFound = notFound;
