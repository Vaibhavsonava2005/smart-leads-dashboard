"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const user_model_1 = require("../models/user.model");
const ApiError_1 = require("../utils/ApiError");
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // Decode the token and verify signature
            const decoded = jsonwebtoken_1.default.verify(token, env_1.ENV.JWT_SECRET);
            // Attach user to request (excluding password)
            const user = await user_model_1.User.findById(decoded.id).select('-password');
            if (!user) {
                return next(new ApiError_1.ApiError(401, 'User not found'));
            }
            req.user = user;
            next();
        }
        catch (error) {
            return next(new ApiError_1.ApiError(401, 'Not authorized, token failed'));
        }
    }
    if (!token) {
        return next(new ApiError_1.ApiError(401, 'Not authorized, no token'));
    }
};
exports.protect = protect;
