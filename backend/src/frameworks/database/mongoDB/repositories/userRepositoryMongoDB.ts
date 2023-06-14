import { GoogleUserInteface } from '../../../../types/googleUserInterface';
import { CreateUserInterface } from '../../../../types/userInterface';
import User from '../models/userModel';

export const userRepositoryMongoDB = () => {
  const getUserByEmail = async (email: string) => {
    const user: CreateUserInterface | null = await User.findOne({ email });
    return user;
  };

  //add user

  const addUser = async (
    user: CreateUserInterface | GoogleUserInteface,
    profileId: any
  ) => {
    const newUser: any = new User(user);
    newUser.profileId = profileId;
    newUser.save();
    return newUser;
  };

  return {
    getUserByEmail,
    addUser,
  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
