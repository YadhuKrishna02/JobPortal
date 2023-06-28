"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicantDB = void 0;
const jobModel_1 = __importDefault(require("../models/jobModel"));
const userProfile_1 = __importDefault(require("../models/userProfile"));
const appError_1 = __importDefault(require("../../../../utils/appError"));
const httpStatus_1 = require("../../../../types/httpStatus");
// import { JobInterface } from '../../../../types/jobInterface';
const applicantDB = () => {
    const addApplicant = async (applicantId, jobId) => {
        console.log(applicantId, 'tyyyy');
        const userProfile = await userProfile_1.default.findOne({ _id: applicantId });
        console.log(userProfile, 'ioioioioio');
        const userjob = await jobModel_1.default.findById(jobId);
        if (!userjob || !userProfile) {
            throw new appError_1.default('Invalid job or user profile', httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        const appliedJobs = userProfile.appliedJobs;
        // console.log(appliedJobs, 'lllllllllll');
        const jobExists = appliedJobs.some((appliedJob) => appliedJob._id == jobId);
        if (!jobExists) {
            appliedJobs.push({ _id: jobId, status: 'pending' });
            // userProfile.appliedJobs = appliedJobs;
        }
        const applicants = userjob.appliedUsers;
        if (!applicants.includes(applicantId)) {
            applicants.push(applicantId);
            userjob.appliedUsers = applicants;
        }
        // const alreadyApplied = job.appliedUsers.includes(applicantId);
        // if (alreadyApplied) {
        //   throw new AppError('Already applied', HttpStatus.BAD_REQUEST);
        // }
        // job.appliedUsers.push(applicantId);
        // userProfile.appliedJobs.push(jobId);
        return await Promise.all([userjob.save(), userProfile.save()]).then((result) => {
            // console.log(result, 'yoooooo');
            return result;
        });
    };
    return {
        addApplicant,
    };
};
exports.applicantDB = applicantDB;
