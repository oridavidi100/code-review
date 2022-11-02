import express from 'express';

import cors from 'cors';

import config from './config';

import mongoose from 'mongoose';

import Router from './routes/api';

import errorHandlerMiddleware from './middleware/errorHandler';

const { MONGO_URL } = config;

const app = express();

app.use(cors());

const port = 5000;

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

app.listen(port, () => {});
console.log(`app listen at port ${port}`);
