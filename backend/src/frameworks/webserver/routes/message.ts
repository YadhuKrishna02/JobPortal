import express from 'express';
import messageController from '../../../adapters/messageController/messageController';
import { messageDbInterface } from '../../../application/repositories/messageDbInterface';
import { messageRepositoryImp } from '../../database/Mongodb/repositories/messageRepository';

const messageRouter = () => {
  const router = express.Router();
  const controller = messageController(
    messageDbInterface,
    messageRepositoryImp
  );
  router.post('/', controller.addMessage);

  router.get('/:chatId', controller.getMessages);

  return router;
};
export default messageRouter;
