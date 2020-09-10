import 'reflect-metadata';

import express from 'express';
import cors from 'cors';

import routes from './routes';
import './configs/database';
import job from './providers/cron';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(3333);

job.start();
