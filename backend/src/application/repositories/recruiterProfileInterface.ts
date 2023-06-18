import { recProfileDb } from '../../frameworks/database/mongoDB/repositories/recruiterProfile';
import { recruiterProfileInterface } from '../../types/recrProfileInterface';

export const recProfileDbInterface = (repository: ReturnType<recProfileDb>) => {
  const addProfile = async (profile: recruiterProfileInterface | any) =>
    await repository.addProfile(profile);

  const editProfile = async (
    profileId: string,
    editedData: recruiterProfileInterface
  ) => {
    const details = await repository.editProfile(profileId, editedData);
    return details;
  };

  return {
    addProfile,
    editProfile,
  };
};

export type recProfileDbInterface = typeof recProfileDbInterface;
