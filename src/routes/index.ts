import { Router } from 'express';

import InstagramHashtagController from '../controllers/InstagramHashtagController';

const routes = Router();

routes.use('/instagramhashtag', InstagramHashtagController.index);

export default routes;
