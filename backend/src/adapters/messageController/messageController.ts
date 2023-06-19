import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { resolve } from 'path';
import { messageDbInterfaceType } from '../../application/repositories/messageDbInterface';
import { messageRepositoryType } from '../../frameworks/database/Mongodb/repositories/messageRepository';
import {
  messageAdd,
  getMessage,
} from '../../application/use-cases/message/message';

const messageController = (
  messageDbInterface: messageDbInterfaceType,
  messageDbImp: messageRepositoryType
) => {
  const dbRepositorymessage = messageDbInterface(messageDbImp());

  const addMessage = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body, 'reqqqqqqqqqqq');

    const { chatId, senderId, message } = req.body;
    const messages = await messageAdd(
      chatId,
      senderId,
      message,
      dbRepositorymessage
    );
    res.json({
      status: 'success',
      messages,
    });
  });
  const getMessages = asyncHandler(async (req: Request, res: Response) => {
    const { chatId } = req.params;
    const messages = await getMessage(chatId, dbRepositorymessage);
    console.log(messages, 'lololo');

    res.json({
      status: 'success',
      messages,
    });
  });

  return {
    addMessage,
    getMessages,
  };
};
export default messageController;
