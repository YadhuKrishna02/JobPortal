"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recruiterDbInterface = void 0;
const recruiterModel_1 = __importDefault(require("../../frameworks/database/mongoDB/models/recruiterModel"));
const recruiterDbInterface = (repository) => {
    const getRecruiterByMail = async (email) => await repository.getRecruiterByMail(email);
    const getRecruiterByName = async (userName) => await repository.getRecruiterByName(userName);
    const addRecruiter = async (recruiter, profileId) => {
        const newRecruiter = new recruiterModel_1.default(recruiter);
        newRecruiter.profileId = profileId;
        newRecruiter.save();
        return newRecruiter;
    };
    const getDetails = async (recId) => {
        const recruiter = repository.getDetails(recId);
        return recruiter;
    };
    return {
        getRecruiterByMail,
        getRecruiterByName,
        addRecruiter,
        getDetails,
    };
};
exports.recruiterDbInterface = recruiterDbInterface;
