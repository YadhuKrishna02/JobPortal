import express from 'express';
import jobController from '../../../adapters/jobController/jobController';
import { nodeMailerInterface } from '../../../application/services/nodeMailerInterface';
import { nodeMailerService } from '../../services/nodeMailer';
import {
  JobDbInterface,
  jobDbInterface,
} from '../../../application/repositories/jobDbInterface';
import { recProfileDbInterface } from '../../../application/repositories/recruiterProfileInterface';
import { recProfileDb } from '../../../frameworks/database/mongoDb/repositories/recruiterProfile';
import { jobDB } from '../../database/mongoDb/repositories/jobDB';
import upload from '../middlewares/cloudinaryConfig';
import { uploadLogo } from '../middlewares/cloudinaryConfig';

const recruiterRouter = () => {
  const router = express.Router();

  const controller = jobController(
    jobDbInterface,
    jobDB,
    recProfileDbInterface,
    recProfileDb,
    nodeMailerInterface,
    nodeMailerService
  );

  router.post('/create_job', controller.postJob);

  router.get('/view_job/:recId', controller.viewJob);

  router.put('/edit_job/:id', controller.editJob);

  router.delete('/delete_job/:id', controller.deleteJob);

  router.put('/edit_profile/:id', uploadLogo, controller.editProfile);

  router.get('/applicants_list/:jobId', controller.getApplicants);

  router.post('/change_applicant_status', controller.changeStatus);

  router.post('/interview_link', controller.sendInterviewLink);

  return router;
};

export default recruiterRouter;
