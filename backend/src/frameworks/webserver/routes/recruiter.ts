import express from 'express';
import jobController from '../../../adapters/jobController/jobController';
import {
  JobDbInterface,
  jobDbInterface,
} from '../../../application/repositories/jobDbInterface';
import { jobDB } from '../../database/mongoDB/repositories/jobDB';
// import { GoogleAuthService } from '../../services/googleAuthService';
// import { adminDbRepository } from '../../../application/repositories/adminDbRepository';
// import { googleAuthServiceInterface } from '../../../application/services/googleAuthServiceInterface';
// import { adminRepositoryMongoDB } from '../../database/mongoDb/repositories/adminRepositoryMongoDB';
// import { googleAuthService } from '../../services/googleAuthService';

const recruiterRouter = () => {
  const router = express.Router();

  const controller = jobController(jobDbInterface, jobDB);

  router.post('/create_job', controller.postJob);

  router.put('/edit_job/:id', controller.editJob);

  router.delete('/delete_job/:id', controller.deleteJob);

  router.put('edit_profile/:id', controller.editProfile);

  router.get('/applicants_list/:jobId', controller.getApplicants);

  return router;
};

export default recruiterRouter;
