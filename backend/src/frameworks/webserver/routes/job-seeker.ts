import express from 'express';
import userController from '../../../adapters/userController/userController';
import { userProfileDb } from '../../database/mongoDb/repositories/userProfile';
import { profileDbInterface } from '../../../application/repositories/userProfileInterface';
import { applicantDbInterface } from '../../../application/repositories/applicantDbInterface';
import { applicantDB } from '../../database/mongoDb/repositories/applicantDB';
import { jobDbInterface } from '../../../application/repositories/jobDbInterface';
import { jobDB } from '../../database/mongoDb/repositories/jobDB';
import upload from '../middlewares/cloudinaryConfig';

const userRouter = () => {
  const router = express.Router();

  const controller = userController(
    profileDbInterface,
    userProfileDb,
    applicantDbInterface,
    applicantDB,
    jobDbInterface,
    jobDB
  );

  router.post('/add_profile', controller.addProfile);

  router.put('/edit_profile/:id', upload, controller.editProfile);

  router.post('/apply_job/', controller.applyJob);

  router.get('/applied_jobs/:profileId', controller.getAppliedJobs);

  router.get('/all_jobs', controller.allJobs);

  router.get('/filter_jobs', controller.filteredJobs);

  router.get('/fetch_status', controller.getStatus);

  return router;
};

export default userRouter;
