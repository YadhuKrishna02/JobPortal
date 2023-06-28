"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileDb = void 0;
const userProfile_1 = require("../models/userProfile");
const jobModel_1 = require("../models/jobModel");
const userProfileDb = () => {
    const addProfile = async (profileData) => {
        return await userProfile_1.UserProfile.create(profileData);
    };
    const editProfile = async (_id, editedData) => {
        const editedJobData = await userProfile_1.UserProfile.findByIdAndUpdate({ _id }, { $set: editedData }, { new: true });
        return editedJobData;
    };
    const getAppliedJobs = async (profileId) => {
        try {
            const userProfile = await userProfile_1.UserProfile.findById(profileId);
            if (!userProfile) {
                return false;
            }
            const appliedJobs = userProfile.appliedJobs;
            const jobs = await jobModel_1.Job.find({ _id: { $in: appliedJobs } }).exec();
            return jobs;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
    const getStatus = async (applicantId, jobId) => {
        try {
            const userProfile = await userProfile_1.UserProfile.findOne({
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
