"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recruiterDB = void 0;
const recruiterModel_1 = require("../models/recruiterModel");
const recruiterDB = () => {
    const getRecruiterByMail = async (email) => {
        const recruiterEmail = await recruiterModel_1.Recruiter.findOne({
            email,
        });
        return recruiterEmail;
    };
    const getRecruiterByName = async (userName) => {
        const recruiter = await recruiterModel_1.Recruiter.findOne({
            userName,
        });
        return recruiter;
    };
    const getDetails = async (recId) => {
        const recruiter = await recruiterModel_1.Recruiter.findById(recId).populate('profileId');
        console.log(recruiter, 'reccccc');
        return recruiter;
    };
    //add user
    const addRecruiter = async (recruiter, profileId) => {
        return await recruiterModel_1.Recruiter.create(recruiter);
    };
    return {
        getRecruiterByMail,
        getRecruiterByName,
        addRecruiter,
        getDetails,
    };
};
exports.recruiterDB = recruiterDB;
