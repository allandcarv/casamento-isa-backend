import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import cors from 'cors';

import routes from './routes';
import './providers/cron';

createConnection().then(() => {
  const port = process.env.PORT || 3333;

  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(routes);

  app.listen(port);
});
