import { Router } from 'express';

import HashtagController from '../controllers/HashtagController';
import InstagramHashtagController from '../controllers/InstagramHashtagController';

const routes = Router();

routes.use('/hashtags', HashtagController.index);
routes.use('/instagramhashtag', InstagramHashtagController.index);

export default routes;
