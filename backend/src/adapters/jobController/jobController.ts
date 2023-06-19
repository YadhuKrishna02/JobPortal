import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { jobDB } from '../../frameworks/database/mongoDB/repositories/jobDB';
import { JobInterface } from '../../types/jobInterface';
import { createJob } from '../../application/use-cases/job/job';
import { JobDbInterface } from '../../application/repositories/jobDbInterface';
import { EditJob } from '../../application/use-cases/job/job';
import { DeleteJob } from '../../application/use-cases/job/job';
import { recruiterProfileInterface } from '../../types/recrProfileInterface';
import { recProfileDbInterface } from '../../application/repositories/recruiterProfileInterface';
import { recProfileDb } from '../../frameworks/database/mongoDB/repositories/recruiterProfile';
import { applicantDetails } from '../../application/use-cases/recruiter/recruiter';
import { ProfileEdit } from '../../application/use-cases/recruiter/recruiter';
import { ViewJob } from '../../application/use-cases/job/job';
import { Types } from 'mongoose';

const jobController = (
  jobInterface: JobDbInterface,
  jobDbImpl: jobDB,
  recProfileInterface: recProfileDbInterface,
  recProfileImpl: recProfileDb
) => {
  const dbRepositoryJob = jobInterface(jobDbImpl());
  const dbRepositoryRecProfile = recProfileInterface(recProfileImpl());

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

  //view job

  const viewJob = asyncHandler(async (req: Request, res: Response) => {
    const { recId } = req.params;

    const getJob = await ViewJob(recId, dbRepositoryJob);
    res.json({
      status: 'success',
      message: 'jobs fetched successfully',
      getJob,
    });
    // res.json({})
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

  //edit profile

  const editProfile = asyncHandler(async (req: Request, res: Response) => {
    const editedData: recruiterProfileInterface = req.body;
    const profileId: string = req.params.id;
    const file: any = req?.file?.path;
    const editedProfile: any = await ProfileEdit(
      editedData,
      profileId,
      dbRepositoryRecProfile,
      file
    );
    console.log(editedProfile, 'plolo');

    res.json({
      status: 'success',
      message: 'profile edited successfully',
      editedProfile,
    });
  });

  return {
    postJob,
    editJob,
    deleteJob,
    getApplicants,
    editProfile,
    viewJob,
  };
};

export default jobController;
