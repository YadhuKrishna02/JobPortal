"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const recruiter_1 = __importDefault(require("./recruiter"));
const job_seeker_1 = __importDefault(require("./job-seeker"));
const chat_1 = __importDefault(require("./chat"));
const message_1 = __importDefault(require("./message"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const routes = (app) => {
    app.use('/api/auth', (0, auth_1.default)());
    app.use('/api/', (0, job_seeker_1.default)());
    app.use('/api/recruiter', authMiddleware_1.default, (0, recruiter_1.default)());
    app.use('/api/chat', (0, chat_1.default)());
    app.use('/api/message', (0, message_1.default)());
};
exports.default = routes;
