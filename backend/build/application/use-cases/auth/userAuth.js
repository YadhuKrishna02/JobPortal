"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDetails = exports.recruiterDetails = exports.recruiterLogin = exports.googleUserLogin = exports.userLogin = exports.recruiterRegister = exports.userRegister = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const userRegister = async (user, userRepository, dbRepositoryProfile, authService) => {
    user.email = user.email.toLowerCase();
    const isExistingEmail = await userRepository.getUserByEmail(user.email);
    if (isExistingEmail) {
        throw new appError_1.default('existing email', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    user.password = await authService.encryptPassword(user.password);
    const profile = await dbRepositoryProfile.addProfile(user);
    const createdUser = await userRepository.addUser(user, profile._id);
    const applicantId = profile._id;
    const token = authService.generateToken(createdUser._id.toString());
    return { token, profile, applicantId };
};
exports.userRegister = userRegister;
const recruiterRegister = async (recruiter, recruiterRepository, authService, dbRepositoryRecProfile) => {
    recruiter.email = recruiter.email.toLowerCase();
    const isExistingEmail = await recruiterRepository.getRecruiterByMail(recruiter.email);
    if (isExistingEmail) {
        throw new appError_1.default('existing email', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const existingRecruiter = await recruiterRepository.getRecruiterByName(recruiter.userName);
    if (existingRecruiter) {
        throw new appError_1.default('existing recruiter', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    recruiter.password = await authService.encryptPassword(recruiter.password);
    const profile = await dbRepositoryRecProfile.addProfile(recruiter);
    const recruiterData = await recruiterRepository.addRecruiter(recruiter, profile._id);
    const token = authService.generateToken(recruiterData._id.toString());
    return { token, profile, recruiterData };
};
exports.recruiterRegister = recruiterRegister;
const userLogin = async (email, password, userRepository, authService) => {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new appError_1.default("this user doesn't exist", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const isPasswordCorrect = await authService.comparePassword(password, user.password);
    if (!isPasswordCorrect) {
        throw new appError_1.default('Sorry, your password was incorrect. Please double-check your password', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const token = authService.generateToken(user._id.toString());
    // const profile = user.profileId;
    return token;
};
exports.userLogin = userLogin;
const googleUserLogin = async (user, userRepository, dbRepositoryProfile, authService) => {
    const isExistingEmail = await userRepository.getUserByEmail(user.email);
    if (isExistingEmail) {
        const token = authService.generateToken(isExistingEmail._id.toString());
        const applicantId = isExistingEmail.profileId;
        return { token, applicantId };
    }
    else {
        const profile = await dbRepositoryProfile.addProfile(user);
        const createdUser = await userRepository.addUser(user, profile._id);
        const applicantId = profile._id;
        const token = authService.generateToken(createdUser._id.toString());
        return { token, profile, applicantId };
    }
};
exports.googleUserLogin = googleUserLogin;
const recruiterLogin = async (email, password, recruiterRepository, authService) => {
    const recruiterData = await recruiterRepository.getRecruiterByMail(email);
    if (!recruiterData) {
        throw new appError_1.default("this user doesn't exist", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const isPasswordCorrect = await authService.comparePassword(password, recruiterData.password);
    if (!isPasswordCorrect) {
        throw new appError_1.default('Sorry, your password was incorrect. Please double-check your password', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const token = authService.generateToken(recruiterData._id.toString());
    return { token, recruiterData };
};
exports.recruiterLogin = recruiterLogin;
const recruiterDetails = async (recId, recruiterRepository) => {
    const profileDetails = await recruiterRepository.getDetails(recId);
    return profileDetails;
};
exports.recruiterDetails = recruiterDetails;
const userDetails = async (userId, userRepository) => {
    const profileDetails = await userRepository.getDetails(userId);
    console.log(profileDetails, 'hhhhhhh');
    return profileDetails;
};
exports.userDetails = userDetails;
