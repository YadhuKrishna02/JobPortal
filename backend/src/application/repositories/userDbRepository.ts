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

  return {
    getUserByEmail,
    addUser,
  };
};

export type UserDbInterface = typeof userDbRepository;
