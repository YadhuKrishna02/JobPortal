"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userProfileSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
    education: {
        type: String,
    },
    languages: {
        type: [String],
        default: [],
    },
    resume: {
        type: String,
    },
    appliedJobs: {
        type: [
            {
                _id: {
                    type: String,
                    ref: 'Job',
                },
                status: {
                    type: String,
                    default: 'pending',
                },
            },
        ],
        ref: 'Job',
    },
});
const UserProfile = mongoose_1.default.model('UserProfile', userProfileSchema);
exports.default = UserProfile;
