import 'reflect-metadata';

import express from 'express';
import cors from 'cors';

import routes from './routes';
import './configs/database';
import './providers/cron';

const port = process.env.PORT || 3333;

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(port);
