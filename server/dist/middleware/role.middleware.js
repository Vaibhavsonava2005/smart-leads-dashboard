"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const ApiError_1 = require("../utils/ApiError");
// Strictly ensures the user has one of the allowed roles
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ApiError_1.ApiError(401, 'Not authorized'));
        }
        if (!roles.includes(req.user.role)) {
            return next(new ApiError_1.ApiError(403, 'User role is not authorized to access this route'));
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
