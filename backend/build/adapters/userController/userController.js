"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const editProfile_1 = require("../../application/use-cases/job-seeker/editProfile");
const editProfile_2 = require("../../application/use-cases/job-seeker/editProfile");
const job_1 = require("../../application/use-cases/job/job");
const editProfile_3 = require("../../application/use-cases/job-seeker/editProfile");
const job_2 = require("../../application/use-cases/job/job");
const job_3 = require("../../application/use-cases/job/job");
const editProfile_4 = require("../../application/use-cases/job-seeker/editProfile");
const userController = (userProfileInterface, profileImplInterface, applicantInterface, applicantDB, jobDbInterface, jobDbImpl) => {
    const dbRepositoryProfile = userProfileInterface(profileImplInterface());
    const applicantRepository = applicantInterface(applicantDB());
    const jobRepository = jobDbInterface(jobDbImpl());
    //add profile
    const addProfile = (0, express_async_handler_1.default)(async (req, res) => {
        const profileData = req.body;
        const createdProfile = await (0, editProfile_2.CreateProfile)(profileData, dbRepositoryProfile);
        res.json({
            createdProfile,
            status: 'success',
            message: 'profile created successfully',
        });
    });
    //edit profile
    const editProfile = (0, express_async_handler_1.default)(async (req, res) => {
        const editedData = req.body;
        const file = req?.file?.path;
        console.log(file, 'fileeeeee');
        const { id } = req.params;
        const editedProfile = await (0, editProfile_1.EditProfile)(id, editedData, dbRepositoryProfile, file);
        res.json({
            editedProfile,
            status: 'success',
            message: 'profile edited successfully',
        });
    });
    //apply job
    const applyJob = (0, express_async_handler_1.default)(async (req, res) => {
        const { applicantId } = req.query;
        const { jobId } = req.query;
        const jobApply = await (0, job_1.ApplyJob)(applicantId, jobId, applicantRepository);
        console.log(jobApply, 'kokok');
        res.json({
            jobApply,
            status: 'success',
            message: 'job applied successfully',
        });
    });
    const getAppliedJobs = (0, express_async_handler_1.default)(async (req, res) => {
        const { profileId } = req.params;
        const jobs = await (0, editProfile_3.AppliedJobs)(profileId, dbRepositoryProfile);
        res.json({
            status: 'success',
            message: 'jobs fetched successfully',
            jobs,
        });
    });
    //get all jobs
    const allJobs = (0, express_async_handler_1.default)(async (req, res) => {
        const jobs = await (0, job_3.AllJobs)(jobRepository);
        res.json({
            status: 'success',
            message: 'jobs fetched successfully',
            jobs,
        });
    });
    //get status
    const getStatus = (0, express_async_handler_1.default)(async (req, res) => {
        const { applicantId, jobId } = req.query;
        const statusResponse = await (0, editProfile_4.GetStatus)(applicantId, jobId, dbRepositoryProfile);
        console.log(statusResponse, 'rrrrrrr');
        res.json({
            status: 'success',
            message: 'status fetched successfully',
            statusResponse,
        });
    });
    //filtered jobs
    const filteredJobs = (0, express_async_handler_1.default)(async (req, res) => {
        const { jobLocation, salary, jobTitle } = req.query;
        const query = {};
        if (jobLocation) {
            query.jobLocation = jobLocation;
        }
        if (jobTitle) {
            query.jobTitle = jobTitle;
        }
        if (salary) {
            query.salary = { $gte: Number(salary) }; // Assuming salary is a numeric field
        }
        const jobs = await (0, job_2.FilteredJobs)(query, jobRepository);
        console.log(jobs, 'jooooooooooooo');
        if (jobs.length > 0) {
            res.json({
                jobs,
                status: 'success',
                message: 'jobs filtered successfully',
            });
        }
        else {
            res.json({
                status: 'fail',
                message: 'No matching Jobs found',
            });
        }
    });
    return {
        editProfile,
        addProfile,
        applyJob,
        getAppliedJobs,
        allJobs,
        filteredJobs,
        getStatus,
    };
};
exports.default = userController;
