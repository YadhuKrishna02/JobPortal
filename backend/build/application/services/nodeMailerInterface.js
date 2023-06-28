"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeMailerInterface = void 0;
const nodeMailerInterface = (service) => {
    const emailVerification = (email, firstName, roomId) => {
        return service.nodemailerEmailVerification(email, firstName, roomId);
    };
    return {
        emailVerification,
    };
};
exports.nodeMailerInterface = nodeMailerInterface;
