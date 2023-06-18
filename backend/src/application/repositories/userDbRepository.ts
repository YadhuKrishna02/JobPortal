import { UserRepositoryMongoDB } from '../../frameworks/database/mongoDb/repositories/userRepositoryMongoDB';
import { GoogleUserInteface } from '../../types/googleUserInterface';
import { CreateUserInterface } from '../../types/userInterface';
export const userDbRepository = (
  repository: ReturnType<UserRepositoryMongoDB>
) => {
  const getUserByEmail = async (email: string) =>
    await repository.getUserByEmail(email);

  const addUser = async (
    user: GoogleUserInteface | CreateUserInterface,
    profileId: any
  ) => await repository.addUser(user, profileId);

  const getDetails = async (userId: string) =>
    await repository.getDetails(userId);

  return {
    getUserByEmail,
    addUser,
    getDetails,
  };
};

export type UserDbInterface = typeof userDbRepository;
