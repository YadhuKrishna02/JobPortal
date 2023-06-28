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
import { nodeMailerServiceInterface } from '../../application/services/nodeMailerInterface';
import { nodemailerserviceimple } from '../../frameworks/services/nodeMailer';
import { SendInterviewLink } from '../../application/use-cases/recruiter/recruiter';
import { ChangeStatus } from '../../application/use-cases/recruiter/recruiter';
import { ViewJob } from '../../application/use-cases/job/job';
import { Types } from 'mongoose';

const jobController = (
  jobInterface: JobDbInterface,
  jobDbImpl: jobDB,
  recProfileInterface: recProfileDbInterface,
  recProfileImpl: recProfileDb,
  nodeMailerInterface: nodeMailerServiceInterface,
  nodeMailerService: nodemailerserviceimple
) => {
  const dbRepositoryJob = jobInterface(jobDbImpl());
  const dbRepositoryRecProfile = recProfileInterface(recProfileImpl());
  const nodemailer = nodeMailerInterface(nodeMailerService());

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

  //send interview link

  const sendInterviewLink = asyncHandler(
    async (req: Request, res: Response) => {
      const linkData = req.body;
      const sendLink = await SendInterviewLink(linkData, nodemailer);
      console.log(sendLink, 'linkkkkkkkk');
    }
  );

  //change status

  const changeStatus = asyncHandler(async (req: Request, res: Response) => {
    const { jobId, applicantId, status } = req.query;

    const statusChange: any = await ChangeStatus(
      jobId,
      applicantId,
      status,
      dbRepositoryJob
    );

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

export default jobController;
