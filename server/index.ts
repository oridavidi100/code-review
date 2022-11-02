import express from 'express';

import cors from 'cors';

import config from './config';

import mongoose from 'mongoose';

const { MONGO_URL } = config;
const app = express();

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

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(port, () => {});
console.log(`app listen at port ${port}`);
