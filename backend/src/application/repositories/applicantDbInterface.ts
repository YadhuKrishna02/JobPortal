import mongoose, { Types } from 'mongoose';
import { applicantDB } from '../../frameworks/database/mongoDB/repositories/applicantDB';

export const applicantDbInterface = (repository: ReturnType<applicantDB>) => {
  const addApplicant = async (
    applicantId: mongoose.Types.ObjectId,
    jobId: Types.ObjectId
  ) => await repository.addApplicant(applicantId, jobId);

  return {
    addApplicant,
  };
};

export type applicantDbInterface = typeof applicantDbInterface;
