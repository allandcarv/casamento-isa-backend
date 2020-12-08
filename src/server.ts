import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import cors from 'cors';
// import dotenv from 'dotenv';

import routes from './routes';
import './providers/cron';

// dotenv.config();

createConnection({
  name: 'default',
  type: 'mongodb',
  url: process.env.MONGODB_URI,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  synchronize: true,
  entities: ['**/models/*.ts'],
}).then(() => {
  const port = process.env.PORT || 3333;

  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(routes);

  app.listen(port);
});
