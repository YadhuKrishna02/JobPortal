import express from 'express';

const chatRouter = () => {
  const router = express.Router();

  // const controller = chatController();

  // router.post('/', controller.createChat);

  // router.get('/:userId', controller.userChats);

  // router.get('/find/:firstId/:secondId', controller.findChat);

  return router;
};

export default chatRouter;
