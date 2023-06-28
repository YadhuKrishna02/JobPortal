"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDbRepository = void 0;
const userDbRepository = (repository) => {
    const getUserByEmail = async (email) => await repository.getUserByEmail(email);
    const addUser = async (user, profileId) => await repository.addUser(user, profileId);
    const getDetails = async (userId) => await repository.getDetails(userId);
    return {
        getUserByEmail,
        addUser,
        getDetails,
    };
};
exports.userDbRepository = userDbRepository;
