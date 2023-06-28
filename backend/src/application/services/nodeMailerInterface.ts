import { nodemailerserviceimple } from '../../frameworks/services/nodeMailer';
import { NodemailerReturn } from '../../frameworks/services/nodeMailer';
export const nodeMailerInterface = (service: NodemailerReturn) => {
  const emailVerification = (
    email: string,
    firstName: string,
    roomId: string
  ) => {
    return service.nodemailerEmailVerification(email, firstName, roomId);
  };
  return {
    emailVerification,
  };
};

export type nodeMailerServiceInterface = typeof nodeMailerInterface;
