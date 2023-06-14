import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { jobDB } from '../../frameworks/database/mongoDB/repositories/jobDB';
import { JobInterface } from '../../types/jobInterface';
import { createJob } from '../../application/use-cases/job/job';
import { JobDbInterface } from '../../application/repositories/jobDbInterface';
import { EditJob } from '../../application/use-cases/job/job';
import { DeleteJob } from '../../application/use-cases/job/job';
import { recruiterProfileInterface } from '../../types/recrProfileInterface';
import { applicantDetails } from '../../application/use-cases/recruiter/recruiter';
import { Types } from 'mongoose';

const jobController = (jobInterface: JobDbInterface, jobDbImpl: jobDB) => {
  const dbRepositoryJob = jobInterface(jobDbImpl());

  //post job
  const postJob = asyncHandler(async (req: Request, res: Response) => {
    const jobDetails: JobInterface = req.body;
    console.log(jobDetails, 'popopop');
    const job = await createJob(jobDetails, dbRepositoryJob);
    res.json({
      job,
      status: 'success',
      message: 'new job created',
    });
  });

  //edit job

  const editJob = asyncHandler(async (req: Request, res: Response) => {
    const editedData: JobInterface = req.body;
    const { id } = req.params;
    const editedJob = await EditJob(id, editedData, dbRepositoryJob);
    res.json({
      editedJob,
      status: 'success',
      message: 'job edited successfully',
    });
  });

  //delete job

  const deleteJob = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedJob = await DeleteJob(id, dbRepositoryJob);
    console.log(deletedJob, 'delJobbbbbbbbbbb');
    res.json({
      deletedJob,
      status: 'success',
      message: 'job deleted successfully',
    });
  });

  //edit profile

  const editProfile = asyncHandler(async (req: Request, res: Response) => {
    const editedData: recruiterProfileInterface = req.body;
    const { id } = req.params;
    // const job = await EditProfile(id, editedData, dbRepositoryJob);
    // res.json({
    //   status: 'success',
    //   message: 'job edited successfully',
    // });
  });

  //get applicants

  const getApplicants = asyncHandler(async (req: Request, res: Response) => {
    const jobId: string = req.params.jobId;
    const applicantsDetails = await applicantDetails(jobId, dbRepositoryJob);
    if (applicantsDetails) {
      res.json({
        status: 'success',
        message: 'applicants fetched successfully',
        applicantsDetails,
      });
    }
  });

  return {
    postJob,
    editJob,
    editProfile,
    deleteJob,
    getApplicants,
  };
};

export default jobController;
