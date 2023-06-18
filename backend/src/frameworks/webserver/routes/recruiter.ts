import express from 'express';
import jobController from '../../../adapters/jobController/jobController';
import {
  JobDbInterface,
  jobDbInterface,
} from '../../../application/repositories/jobDbInterface';
import { recProfileDbInterface } from '../../../application/repositories/recruiterProfileInterface';
import { recProfileDb } from '../../../frameworks/database/mongoDB/repositories/recruiterProfile';
import { jobDB } from '../../database/mongoDB/repositories/jobDB';
import upload from '../middlewares/cloudinaryConfig';
import { uploadLogo } from '../middlewares/cloudinaryConfig';

const recruiterRouter = () => {
  const router = express.Router();

  const controller = jobController(
    jobDbInterface,
    jobDB,
    recProfileDbInterface,
    recProfileDb
  );

  router.post('/create_job', controller.postJob);

  router.put('/edit_job/:id', controller.editJob);

  router.delete('/delete_job/:id', controller.deleteJob);

  router.put('/edit_profile/:id', uploadLogo, controller.editProfile);

  router.get('/applicants_list/:jobId', controller.getApplicants);

  return router;
};

export default recruiterRouter;
