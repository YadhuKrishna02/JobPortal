import RecruiterProfile from '../models/recruiterProfile';
import { recruiterProfileInterface } from '../../../../types/recrProfileInterface';

export const recProfileDb = () => {
  const addProfile = async (profileData: recruiterProfileInterface) => {
    return await RecruiterProfile.create(profileData);
  };

  const editProfile = async (
    _id: string,
    editedData: recruiterProfileInterface
  ) => {
    const editedJobData: recruiterProfileInterface | null =
      await RecruiterProfile.findByIdAndUpdate(
        { _id },
        { $set: editedData },
        { new: true }
      );
    console.log(editedJobData, 'jooooooo');

    return editedJobData;
  };

  return {
    addProfile,
    editProfile,
  };
};

export type recProfileDb = typeof recProfileDb;
