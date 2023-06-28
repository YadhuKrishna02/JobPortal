import nodemailer, { Transporter } from 'nodemailer';
import configKeys from '../../config';
export const nodeMailerService = () => {
  const nodemailerEmailVerification = (
    email: string,
    name: string,
    roomId: string
  ) => {
    try {
      const transporter: Transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: configKeys.EMAIL, // Your email address
          pass: configKeys.PASSWORD, // Your email password
        },
      });

      // Create the email message
      const mailOptions = {
        from: configKeys.EMAIL, // Sender email address
        to: email, // Recipient email address
        subject: ' You have been selected as an InterviewXperts Interviewer',
        html: `<p>Dear ${name},</p>
    <p>Thank you for expressing your interest in becoming an Interviewer at InterviewXperts. We are pleased to inform you that your request has been approved, and you have been selected to join our team of interview experts.</p>
    <p>To get started, please follow the link below to sign up and create your InterviewXperts Interviewer account:</p>
    <p><a href="http://localhost:5173/signup/${roomId}">Sign Up</a></p>
    <p>At InterviewXperts, we provide a comprehensive platform that empowers interviewers like you to enhance the interview experience for our users and help them succeed in their interviews.</p>
    <p>If you have any questions or need further assistance, feel free to reach out to our support team. We are here to support you in your journey as an InterviewXperts Interviewer.</p>
    <p>Best regards,<br/>Sujith S<br/>InterviewXperts Team</p>
    `,
      };

      // Send the email
      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            reject(error); // Reject the promise with the error
          } else {
            console.log('Email sent:', info.response);
            resolve(true); // Resolve the promise with the desired value
          }
        });
      });
    } catch (error) {}
  };

  return { nodemailerEmailVerification };
};
export type nodemailerserviceimple = typeof nodeMailerService;

export type NodemailerReturn = ReturnType<nodemailerserviceimple>;
