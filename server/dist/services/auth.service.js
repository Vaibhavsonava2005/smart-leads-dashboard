"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_model_1 = require("../models/user.model");
const generateToken_1 = require("../utils/generateToken");
const ApiError_1 = require("../utils/ApiError");
const registerUser = async (data) => {
    const { name, email, password, role } = data;
    const userExists = await user_model_1.User.findOne({ email });
    if (userExists) {
        throw new ApiError_1.ApiError(400, 'User already exists');
    }
    const user = await user_model_1.User.create({
        name,
        email,
        password,
        role,
    });
    return {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: (0, generateToken_1.generateToken)(user.id, user.role),
    };
};
exports.registerUser = registerUser;
const loginUser = async (data) => {
    const { email, password } = data;
    const user = await user_model_1.User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        return {
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: (0, generateToken_1.generateToken)(user.id, user.role),
        };
    }
    else {
        throw new ApiError_1.ApiError(401, 'Invalid email or password');
    }
};
exports.loginUser = loginUser;
