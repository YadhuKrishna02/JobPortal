"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./frameworks/database/mongoDB/connection"));
const http_1 = __importDefault(require("http"));
const server_1 = __importDefault(require("./frameworks/webserver/server"));
const express_2 = __importDefault(require("./frameworks/webserver/express"));
const routes_1 = __importDefault(require("./frameworks/webserver/routes"));
// import connection from './frameworks/database/redis/connection';
const errorHandlingMiddleware_1 = __importDefault(require("./frameworks/webserver/middlewares/errorHandlingMiddleware"));
const appError_1 = __importDefault(require("./utils/appError"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
console.log('jjj');
//connecting mongoDb
(0, connection_1.default)();
console.log('apppp');
(0, express_2.default)(app);
// routes for each endpoint
(0, routes_1.default)(app);
app.use(errorHandlingMiddleware_1.default);
// catch 404 and forward to error handler
app.all('*', (req, res, next) => {
    next(new appError_1.default('Not found', 404));
});
(0, server_1.default)(server).startServer();
// export type RedisClient = typeof redisClient;