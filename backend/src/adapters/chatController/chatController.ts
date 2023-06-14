import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { jobDB } from '../../frameworks/database/mongoDB/repositories/jobDB';
import { JobInterface } from '../../types/jobInterface';
import { createJob } from '../../application/use-cases/job/job';
import { JobDbInterface } from '../../application/repositories/jobDbInterface';
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

  return {
    postJob,
  };
};

export default jobController;
