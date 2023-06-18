import { HttpStatus } from '../../../types/httpStatus';
import AppError from '../../../utils/appError';
import { JobDbInterface } from '../../repositories/jobDbInterface';
import { recProfileDbInterface } from '../../repositories/recruiterProfileInterface';
import { recruiterProfileInterface } from '../../../types/recrProfileInterface';

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
