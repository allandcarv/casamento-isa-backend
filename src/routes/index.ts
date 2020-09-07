import { Router } from 'express';

import HashtagController from '../controllers/HashtagController';

const routes = Router();

routes.use('/hashtag', HashtagController.index);

export default routes;
