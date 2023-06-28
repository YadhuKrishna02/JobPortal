"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileDb = void 0;
const userProfile_1 = __importDefault(require("../models/userProfile"));
const jobModel_1 = __importDefault(require("../models/jobModel"));
const userProfileDb = () => {
    const addProfile = async (profileData) => {
        return await userProfile_1.default.create(profileData);
    };
    const editProfile = async (_id, editedData) => {
        const editedJobData = await userProfile_1.default.findByIdAndUpdate({ _id }, { $set: editedData }, { new: true });
        return editedJobData;
    };
    const getAppliedJobs = async (profileId) => {
        try {
            const userProfile = await userProfile_1.default.findById(profileId);
            if (!userProfile) {
                return false;
            }
            const appliedJobs = userProfile.appliedJobs;
            const jobs = await jobModel_1.default.find({ _id: { $in: appliedJobs } }).exec();
            return jobs;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
    const getStatus = async (applicantId, jobId) => {
        try {
            const userProfile = await userProfile_1.default.findOne({
                _id: applicantId,
                'appliedJobs._id': jobId,
            });
            if (!userProfile) {
                return null;
            }
            const appliedJob = userProfile.appliedJobs.find((job) => job._id.toString() === jobId);
            console.log(appliedJob, 'apppppp');
            return appliedJob ? appliedJob.status : null;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
    return {
        editProfile,
        addProfile,
        getAppliedJobs,
        getStatus,
    };
};
exports.userProfileDb = userProfileDb;
