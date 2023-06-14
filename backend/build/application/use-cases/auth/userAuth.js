"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegister = void 0;
const userRegister = async (user, userRepository, authService) => {
    user.email = user.email.toLowerCase();
    const isExistingEmail = await userRepository.getUserByEmail(user.email);
    // if (isExistingEmail) {
    //   throw new AppError('existing email', HttpStatus.UNAUTHORIZED);
    // }
    user.password = await authService.encryptPassword(user.password);
    const { _id: userId } = await userRepository.addUser(user);
    const token = authService.generateToken(userId.toString());
    return token;
};
exports.userRegister = userRegister;
