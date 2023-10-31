import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import moviesRoutes from './routes/movies.js';
import userRoutes from './routes/user.js';
import listRoutes from './routes/lists.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/movies', moviesRoutes);
app.use('/api/user', userRoutes);
app.use('/api/lists', listRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });