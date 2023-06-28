"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = __importDefault(require("../../../adapters/messageController/messageController"));
const messageDbInterface_1 = require("../../../application/repositories/messageDbInterface");
const messageRepository_1 = require("../../database/Mongodb/repositories/messageRepository");
const messageRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, messageController_1.default)(messageDbInterface_1.messageDbInterface, messageRepository_1.messageRepositoryImp);
    router.post('/', controller.addMessage);
    router.get('/:chatId', controller.getMessages);
    return router;
};
exports.default = messageRouter;
