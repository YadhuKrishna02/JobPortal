"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../../../adapters/userController/userController"));
const userProfile_1 = require("../../database/mongoDb/repositories/userProfile");
const userProfileInterface_1 = require("../../../application/repositories/userProfileInterface");
const applicantDbInterface_1 = require("../../../application/repositories/applicantDbInterface");
const applicantDB_1 = require("../../database/mongoDb/repositories/applicantDB");
const jobDbInterface_1 = require("../../../application/repositories/jobDbInterface");
const jobDB_1 = require("../../database/mongoDb/repositories/jobDB");
const cloudinaryConfig_1 = __importDefault(require("../middlewares/cloudinaryConfig"));
const userRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, userController_1.default)(userProfileInterface_1.profileDbInterface, userProfile_1.userProfileDb, applicantDbInterface_1.applicantDbInterface, applicantDB_1.applicantDB, jobDbInterface_1.jobDbInterface, jobDB_1.jobDB);
    router.post('/add_profile', controller.addProfile);
    router.put('/edit_profile/:id', cloudinaryConfig_1.default, controller.editProfile);
    router.post('/apply_job/', controller.applyJob);
    router.get('/applied_jobs/:profileId', controller.getAppliedJobs);
    router.get('/all_jobs', controller.allJobs);
    router.get('/filter_jobs', controller.filteredJobs);
    router.get('/fetch_status', controller.getStatus);
    return router;
};
exports.default = userRouter;
