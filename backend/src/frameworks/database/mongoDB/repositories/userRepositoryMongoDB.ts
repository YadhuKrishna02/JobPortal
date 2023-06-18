import { GoogleUserInteface } from '../../../../types/googleUserInterface';
import { CreateUserInterface } from '../../../../types/userInterface';
import User from '../models/userModel';
import UserProfile from '../models/userProfile';

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

  const getDetails = async (userId: string) => {
    const user: any = await User.findOne({ profileId: userId }).populate(
      'profileId'
    );
    console.log(user, 'useeeeeeee');
    return user;
  };

  return {
    getUserByEmail,
    addUser,
    getDetails,
  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
