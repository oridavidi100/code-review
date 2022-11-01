import express from 'express';

import cors from 'cors';

const app = express();

const port = 5000;

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`app listen at port ${port}`);
});
