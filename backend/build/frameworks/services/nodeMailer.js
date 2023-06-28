"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeMailerService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
const nodeMailerService = () => {
    const nodemailerEmailVerification = (email, name, roomId) => {
        try {
            const transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                auth: {
                    user: config_1.default.EMAIL,
                    pass: config_1.default.PASSWORD, // Your email password
                },
            });
            // Create the email message
            const mailOptions = {
                from: config_1.default.EMAIL,
                to: email,
                subject: ' You have been selected as an InterviewXperts Interviewer',
                html: `<p>Dear ${name},</p>
    <p>Thank you for expressing your interest in becoming part of our team. We are pleased to inform you that your request has been approved, and you have been selected to join our team of interview experts.</p>
    <p>To get started, please follow the link below to sign up and create your InterviewXperts Interviewer account:</p>
    <p><a href="http://localhost:5173/signup/${roomId}">Join</a></p>
    <p>At JobZen, we provide a comprehensive platform that empowers jobseekers like you to enhance the interview experience and help them succeed in their interviews.</p>
    <p>If you have any questions or need further assistance, feel free to reach out to our support team.</p>
    <p>Best regards,<br/>Yadhu Krishna<br/>JobZen Team</p>
    `,
            };
            // Send the email
            return new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error);
                        reject(error); // Reject the promise with the error
                    }
                    else {
                        console.log('Email sent:', info.response);
                        resolve(true); // Resolve the promise with the desired value
                    }
                });
            });
        }
        catch (error) { }
    };
    return { nodemailerEmailVerification };
};
exports.nodeMailerService = nodeMailerService;
