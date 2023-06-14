"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("../../application/use-cases/auth/userAuth");
const authController = (authServiceInterface, authServiceImpl, userDbRepository, userDbRepositoryImpl) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
        const user = req.body;
        const token = await (0, userAuth_1.userRegister)(user, dbRepositoryUser, authService);
        res.json({
            status: 'success',
            message: 'new user registered',
            token,
        });
    });
    return {
        registerUser,
    };
};
exports.default = authController;
