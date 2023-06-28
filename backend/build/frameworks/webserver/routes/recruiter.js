"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobController_1 = __importDefault(require("../../../adapters/jobController/jobController"));
const nodeMailerInterface_1 = require("../../../application/services/nodeMailerInterface");
const nodeMailer_1 = require("../../services/nodeMailer");
const jobDbInterface_1 = require("../../../application/repositories/jobDbInterface");
const recruiterProfileInterface_1 = require("../../../application/repositories/recruiterProfileInterface");
const recruiterProfile_1 = require("../../../frameworks/database/mongoDb/repositories/recruiterProfile");
const jobDB_1 = require("../../database/mongoDb/repositories/jobDB");
const cloudinaryConfig_1 = require("../middlewares/cloudinaryConfig");
const recruiterRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, jobController_1.default)(jobDbInterface_1.jobDbInterface, jobDB_1.jobDB, recruiterProfileInterface_1.recProfileDbInterface, recruiterProfile_1.recProfileDb, nodeMailerInterface_1.nodeMailerInterface, nodeMailer_1.nodeMailerService);
    router.post('/create_job', controller.postJob);
    router.get('/view_job/:recId', controller.viewJob);
    router.put('/edit_job/:id', controller.editJob);
    router.delete('/delete_job/:id', controller.deleteJob);
    router.put('/edit_profile/:id', cloudinaryConfig_1.uploadLogo, controller.editProfile);
    router.get('/applicants_list/:jobId', controller.getApplicants);
    router.post('/change_applicant_status', controller.changeStatus);
    router.post('/interview_link', controller.sendInterviewLink);
    return router;
};
exports.default = recruiterRouter;
