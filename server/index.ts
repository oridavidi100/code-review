import express from 'express';

import cors from 'cors';

import config from './config';

import mongoose from 'mongoose';

import Router from './routes/api';

import errorHandlerMiddleware from './middleware/errorHandler';

import { ClientToServerEvents, ServerToClientEvents } from './@types/socket';

const { MONGO_URL } = config;

const app = express();

app.use(cors());

const port = 5000;

//////////// sockeet ////////
const http = require('http');

import { Server, Socket } from 'socket.io';

import { onConnection } from './controller/socket';

const httpServer = http.createServer(app);

export const io = new Server<ClientToServerEvents, ServerToClientEvents>(
  httpServer,
  {
    cors: {
      origin: ['http://localhost:3000'],
    },
  }
);

io.on('connection', onConnection);

//////////socket.//////////

if (MONGO_URL) {
  mongoose
    .connect(MONGO_URL) // connect to mongodb
    .then(() => {
      console.log(`connected to MongoDB `);
    })
    .catch(error => {
      console.log('error connecting to MongoDB:', error.message);
    });
}

app.use(express.json());

app.use('/api', Router);

app.use(errorHandlerMiddleware);

export const server = httpServer.listen(process.env.PORT || 5000, () => {
  console.log(`appp listening at http://localhost:${process.env.PORT}`);
});
