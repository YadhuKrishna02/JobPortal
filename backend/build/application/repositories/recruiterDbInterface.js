"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recruiterDbInterface = void 0;
const recruiterModel_1 = require("../../frameworks/database/mongoDb/models/recruiterModel");
const recruiterDbInterface = (repository) => {
    const getRecruiterByMail = async (email) => await repository.getRecruiterByMail(email);
    const getRecruiterByName = async (userName) => await repository.getRecruiterByName(userName);
    const addRecruiter = async (recruiter, profileId) => {
        const newRecruiter = new recruiterModel_1.Recruiter(recruiter);
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
