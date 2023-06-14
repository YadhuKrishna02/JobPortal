import express, { Application, NextFunction } from 'express';
import connectDB from './frameworks/database/mongoDB/connection';
import http from 'http';
import serverConfig from './frameworks/webserver/server';
import expressConfig from './frameworks/webserver/express';
import routes from './frameworks/webserver/routes';
// import connection from './frameworks/database/redis/connection';
import errorHandlingMidlleware from './frameworks/webserver/middlewares/errorHandlingMiddleware';
import AppError from './utils/appError';
import configKeys from './config';

const app: Application = express();
const server = http.createServer(app);

//connecting mongoDb
connectDB();

expressConfig(app);

// routes for each endpoint
routes(app);

app.use(errorHandlingMidlleware);

// catch 404 and forward to error handler
app.all('*', (req, res, next: NextFunction) => {
  next(new AppError('Not found', 404));
});

serverConfig(server).startServer();

// export type RedisClient = typeof redisClient;