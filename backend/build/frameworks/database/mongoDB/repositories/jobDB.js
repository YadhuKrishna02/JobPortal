"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobDB = void 0;
const jobModel_1 = __importDefault(require("../models/jobModel"));
const userProfile_1 = __importDefault(require("../models/userProfile"));
const jobDB = () => {
    //add user
    const getJob = async (jobTitle) => {
        const job = await jobModel_1.default.findOne({ jobTitle });
        return job;
    };
    const addJob = async (recruiter) => {
        return await jobModel_1.default.create(recruiter);
    };
    //edit job
    const editJob = async (_id, editedData) => {
        const editedJobData = await jobModel_1.default.findByIdAndUpdate({ _id }, { $set: editedData }, { new: true });
        return editedJobData;
    };
    const deleteJob = async (id) => {
        const deletedJob = await jobModel_1.default.findByIdAndDelete(id);
        return deletedJob;
    };
    const getApplicants = async (jobId) => {
        const applicants = await jobModel_1.default.findById(jobId).populate('appliedUsers');
        console.log(applicants?.appliedUsers, 'oooooo');
        return applicants?.appliedUsers;
    };
    const getAllJobs = async () => {
        const jobList = await jobModel_1.default.find();
        return jobList;
    };
    const getJobByRecId = async (recId) => {
        const jobs = await jobModel_1.default.find({ recruiterId: recId });
        console.log(jobs, 'jobsFramee');
        return jobs;
    };
    const getFilteredJobs = async (query) => {
        const filteredJobs = await jobModel_1.default.find(query);
        return filteredJobs;
    };
    const changeStatus = async (jobId, applicantId, status) => {
        const statusResponse = await userProfile_1.default.findOneAndUpdate({
            _id: applicantId,
            'appliedJobs._id': jobId,
        }, { $set: { 'appliedJobs.$.status': status } }, { new: true });
        return statusResponse;
    };
    return {
        addJob,
        getJob,
        editJob,
        deleteJob,
        getApplicants,
        getAllJobs,
        getJobByRecId,
        getFilteredJobs,
        changeStatus,
    };
};
exports.jobDB = jobDB;
