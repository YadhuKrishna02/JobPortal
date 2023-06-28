"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("../../application/use-cases/auth/userAuth");
const userAuth_2 = require("../../application/use-cases/auth/userAuth");
const userAuth_3 = require("../../application/use-cases/auth/userAuth");
const userAuth_4 = require("../../application/use-cases/auth/userAuth");
const authController = (authServiceInterface, authServiceImpl, userDbRepository, userDbRepositoryImpl, recruiterDBImpl, recruiterDBInterface, userProfileInterface, profileImplDb, recProfileInterface, recProfileImpl
// googleAuthService: GoogleAuthService,
// googleAuthServiceInterface: GoogleAuthServiceInterface
) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    const dbRepositoryRecruiter = recruiterDBInterface(recruiterDBImpl());
    const dbRepositoryProfile = userProfileInterface(profileImplDb());
    const dbRepositoryRecProfile = recProfileInterface(recProfileImpl());
    // const googleAuthServices = googleAuthServiceInterface(googleAuthService());
    const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
        const user = req.body;
        const { token, profile, applicantId } = await (0, userAuth_4.userRegister)(user, dbRepositoryUser, dbRepositoryProfile, authService);
        res.json({
            status: 'success',
            message: 'new user registered',
            token,
            profile,
            applicantId,
        });
    });
    const registerRecruiter = (0, express_async_handler_1.default)(async (req, res) => {
        const recruiter = req.body;
        const { token, profile, recruiterData } = await (0, userAuth_4.recruiterRegister)(recruiter, dbRepositoryRecruiter, authService, dbRepositoryRecProfile);
        res.json({
            status: 'success',
            message: 'new recruiter registered',
            token,
            profile,
            recruiterData,
        });
    });
    const loginUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { email, password } = req.body;
        const token = await (0, userAuth_4.userLogin)(email, password, dbRepositoryUser, authService);
        res.json({
            status: 'success',
            message: 'user verified',
            token,
        });
    });
    const loginWithGoogle = (0, express_async_handler_1.default)(async (req, res) => {
        const userDetails = req.body;
        const user = {
            firstName: userDetails?._tokenResponse?.firstName,
            lastName: userDetails?._tokenResponse?.lastName,
            email: userDetails?._tokenResponse?.email,
        };
        const result = await (0, userAuth_1.googleUserLogin)(user, dbRepositoryUser, dbRepositoryProfile, authService);
        console.log(result, 'login-gogggggle');
        const token = result?.token;
        const profile = result?.profile;
        const applicantId = result?.applicantId;
        console.log(applicantId, 'apppppppppp');
        res.json({
            status: 'success',
            message: 'user verified',
            token,
            applicantId,
            profile,
        });
    });
    const loginRecruiter = (0, express_async_handler_1.default)(async (req, res) => {
        const { email, password } = req.body;
        const { token, recruiterData } = await (0, userAuth_4.recruiterLogin)(email, password, dbRepositoryRecruiter, authService);
        res.json({
            status: 'success',
            message: 'recruiter verified',
            token,
            recruiterData,
        });
    });
    //get details
    const getDetails = (0, express_async_handler_1.default)(async (req, res) => {
        const { recId } = req.params;
        const recDetails = await (0, userAuth_2.recruiterDetails)(recId, dbRepositoryRecruiter);
        res.json({
            status: 'success',
            message: 'fetched recruiter data successfully',
            recDetails,
        });
    });
    const getUserDetails = (0, express_async_handler_1.default)(async (req, res) => {
        const { userProfId } = req.params;
        const userProfile = await (0, userAuth_3.userDetails)(userProfId, dbRepositoryUser);
        console.log(userProfile, 'prooooo');
        res.json({
            status: 'success',
            message: 'fetched job seeker data successfully',
            userProfile,
        });
    });
    return {
        registerUser,
        registerRecruiter,
        getDetails,
        getUserDetails,
        loginUser,
        loginRecruiter,
        loginWithGoogle,
    };
};
exports.default = authController;
