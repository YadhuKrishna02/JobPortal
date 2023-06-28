import { HttpStatus } from '../../../types/httpStatus';
import AppError from '../../../utils/appError';
import { JobDbInterface } from '../../repositories/jobDbInterface';
import { nodeMailerServiceInterface } from '../../services/nodeMailerInterface';
import { recProfileDbInterface } from '../../repositories/recruiterProfileInterface';
import { recruiterProfileInterface } from '../../../types/recrProfileInterface';
import { nodeMailerInterface } from '../../services/nodeMailerInterface';

import mongoose, { Types } from 'mongoose';

export const applicantDetails = async (
  jobId: string,
  jobRepository: ReturnType<JobDbInterface>
) => {
  const applicantDetails = await jobRepository.getApplicants(jobId);
  return applicantDetails;
};

export const ProfileEdit = async (
  editedData: {
    companyName: string;
    userName: string;
    email: string;
    contactNumber: string;
    companyAddress: string;
    companySize: string;
    industry: string;
    about: string;
    logo: string;
  },
  profileId: string,
  recProfileRepository: ReturnType<recProfileDbInterface>,
  file: string
) => {
  editedData.logo = file;

  return await recProfileRepository.editProfile(profileId, editedData);
  // console.log(recruiterProfile, 'seddd');

  // return recruiterProfile;
};

export const SendInterviewLink = async (
  roomId: string | any,
  email: string | any,
  firstName: string | any,
  nodeMailerRepository: ReturnType<nodeMailerServiceInterface>
) => {
  return await nodeMailerRepository.emailVerification(email, firstName, roomId);
};

export const ChangeStatus = async (
  jobId: any,
  appplicantId: any,
  status: any,
  jobRepository: ReturnType<JobDbInterface>
) => {
  const statusResponse = await jobRepository.statusChange(
    jobId,
    appplicantId,
    status
  );
  return statusResponse;
};
