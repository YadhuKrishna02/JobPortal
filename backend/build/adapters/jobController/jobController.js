"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const job_1 = require("../../application/use-cases/job/job");
const job_2 = require("../../application/use-cases/job/job");
const job_3 = require("../../application/use-cases/job/job");
const recruiter_1 = require("../../application/use-cases/recruiter/recruiter");
const recruiter_2 = require("../../application/use-cases/recruiter/recruiter");
const recruiter_3 = require("../../application/use-cases/recruiter/recruiter");
const recruiter_4 = require("../../application/use-cases/recruiter/recruiter");
const job_4 = require("../../application/use-cases/job/job");
const jobController = (jobInterface, jobDbImpl, recProfileInterface, recProfileImpl, nodeMailerInterface, nodeMailerService) => {
    const dbRepositoryJob = jobInterface(jobDbImpl());
    const dbRepositoryRecProfile = recProfileInterface(recProfileImpl());
    const nodemailer = nodeMailerInterface(nodeMailerService());
    //post job
    const postJob = (0, express_async_handler_1.default)(async (req, res) => {
        const jobDetails = req.body;
        console.log(jobDetails, 'popopop');
        const job = await (0, job_1.createJob)(jobDetails, dbRepositoryJob);
        res.json({
            job,
            status: 'success',
            message: 'new job created',
        });
    });
    //edit job
    const editJob = (0, express_async_handler_1.default)(async (req, res) => {
        const editedData = req.body;
        const { id } = req.params;
        const editedJob = await (0, job_2.EditJob)(id, editedData, dbRepositoryJob);
        res.json({
            editedJob,
            status: 'success',
            message: 'job edited successfully',
        });
    });
    //view job
    const viewJob = (0, express_async_handler_1.default)(async (req, res) => {
        const { recId } = req.params;
        const getJob = await (0, job_4.ViewJob)(recId, dbRepositoryJob);
        res.json({
            status: 'success',
            message: 'jobs fetched successfully',
            getJob,
        });
        // res.json({})
    });
    //delete job
    const deleteJob = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        const deletedJob = await (0, job_3.DeleteJob)(id, dbRepositoryJob);
        console.log(deletedJob, 'delJobbbbbbbbbbb');
        res.json({
            deletedJob,
            status: 'success',
            message: 'job deleted successfully',
        });
    });
    //get applicants
    const getApplicants = (0, express_async_handler_1.default)(async (req, res) => {
        const jobId = req.params.jobId;
        const applicantsDetails = await (0, recruiter_1.applicantDetails)(jobId, dbRepositoryJob);
        if (applicantsDetails) {
            res.json({
                status: 'success',
                message: 'applicants fetched successfully',
                applicantsDetails,
            });
        }
    });
    //edit profile
    const editProfile = (0, express_async_handler_1.default)(async (req, res) => {
        const editedData = req.body;
        const profileId = req.params.id;
        const file = req?.file?.path;
        const editedProfile = await (0, recruiter_2.ProfileEdit)(editedData, profileId, dbRepositoryRecProfile, file);
        console.log(editedProfile, 'plolo');
        res.json({
            status: 'success',
            message: 'profile edited successfully',
            editedProfile,
        });
    });
    //send interview link
    const sendInterviewLink = (0, express_async_handler_1.default)(async (req, res) => {
        const { roomId, email, firstName } = req.query;
        const sendLink = await (0, recruiter_3.SendInterviewLink)(roomId, email, firstName, nodemailer);
        if (sendLink === true) {
            res.json({
                status: 'success',
                message: 'Email sent successfully',
            });
        }
    });
    //change status
    const changeStatus = (0, express_async_handler_1.default)(async (req, res) => {
        const { jobId, applicantId, status } = req.query;
        const statusChange = await (0, recruiter_4.ChangeStatus)(jobId, applicantId, status, dbRepositoryJob);
        res.json({
            status: 'success',
            message: 'status changed',
        });
    });
    return {
        postJob,
        editJob,
        deleteJob,
        getApplicants,
        editProfile,
        viewJob,
        sendInterviewLink,
        changeStatus,
    };
};
exports.default = jobController;
