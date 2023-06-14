"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../../../adapters/authController/authController"));
const userDbRepository_1 = require("../../../application/repositories/userDbRepository");
const authServiceInterface_1 = require("../../../application/services/authServiceInterface");
const userRepositoryMongoDB_1 = require("../../database/mongoDb/repositories/userRepositoryMongoDB");
const authService_1 = require("../../services/authService");
// import { adminDbRepository } from '../../../application/repositories/adminDbRepository';
// import { googleAuthServiceInterface } from '../../../application/services/googleAuthServiceInterface';
// import { adminRepositoryMongoDB } from '../../database/mongoDb/repositories/adminRepositoryMongoDB';
// import { googleAuthService } from '../../services/googleAuthService';
const authRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, authController_1.default)(authServiceInterface_1.authServiceInterface, authService_1.authService, userDbRepository_1.userDbRepository, userRepositoryMongoDB_1.userRepositoryMongoDB);
    //   router.post('/admin-login', controller.loginAdmin);
    router.post('/signup', controller.registerUser);
    //   router.post('/user-login', controller.loginUser);
    //   router.post('/sign-in-with-google', controller.loginWithGoogle);
    //api/signup
    // router.post('/signup', controller.registerUser);
    // //api/signin
    // router.post('/signin', controller.loginUser);
    // //api/logout
    // router.get('/logout', controller.logOut);
    //api/profile
    return router;
};
exports.default = authRouter;
