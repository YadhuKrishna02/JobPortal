"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recProfileDbInterface = void 0;
const recProfileDbInterface = (repository) => {
    const addProfile = async (profile) => await repository.addProfile(profile);
    const editProfile = async (profileId, editedData) => {
        const details = await repository.editProfile(profileId, editedData);
        return details;
    };
    return {
        addProfile,
        editProfile,
    };
};
exports.recProfileDbInterface = recProfileDbInterface;
