"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const recruiterProfileSchema = new mongoose_1.default.Schema({
    companyName: {
        type: String,
    },
    userName: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
    companyAddress: {
        type: String,
    },
    companySize: {
        type: Number,
    },
    industry: {
        type: String,
    },
    about: {
        type: String,
    },
    logo: {
        type: String, // Store the path or URL of the logo image
    },
}, { timestamps: true });
const RecruiterProfile = mongoose_1.default.model('RecruiterProfile', recruiterProfileSchema);
exports.default = RecruiterProfile;
