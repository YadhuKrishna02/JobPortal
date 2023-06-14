import { HttpStatus } from '../../../types/httpStatus';
import AppError from '../../../utils/appError';
import { JobDbInterface } from '../../repositories/jobDbInterface';

import mongoose, { Types } from 'mongoose';

export const applicantDetails = async (
  jobId: string,
  jobRepository: ReturnType<JobDbInterface>
) => {
  const applicantDetails = await jobRepository.getApplicants(jobId);
  return applicantDetails;
};
