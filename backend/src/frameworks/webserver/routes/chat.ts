import express from 'express';
import chatController from '../../../adapters/chatController/chatController';
import { chatDbInterface } from '../../../application/repositories/chatDbRepsitoryInterface';
import { chatRepositoryImp } from '../../database/Mongodb/repositories/chatRepository';
const chatRouter = () => {
  const router = express.Router();

  const controller = chatController(chatDbInterface, chatRepositoryImp);

  router.post('/', controller.createChat);

  router.get('/:userId', controller.userChats);

  router.get('/find/:firstId/:secondId', controller.findChat);

  return router;
};

export default chatRouter;
