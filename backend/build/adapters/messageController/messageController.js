"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const message_1 = require("../../application/use-cases/message/message");
const messageController = (messageDbInterface, messageDbImp) => {
    const dbRepositorymessage = messageDbInterface(messageDbImp());
    const addMessage = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.body, 'reqqqqqqqqqqq');
        const { chatId, senderId, message } = req.body;
        const messages = await (0, message_1.messageAdd)(chatId, senderId, message, dbRepositorymessage);
        res.json({
            status: 'success',
            messages,
        });
    });
    const getMessages = (0, express_async_handler_1.default)(async (req, res) => {
        const { chatId } = req.params;
        const messages = await (0, message_1.getMessage)(chatId, dbRepositorymessage);
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
exports.default = messageController;
