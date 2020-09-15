import { Router } from 'express';

import MediaController from '../controllers/MediaController';
import InstagramMediaController from '../controllers/InstagramMediaController';

const routes = Router();

routes.use('/photos', MediaController.index);
routes.use('/media', InstagramMediaController.index);

export default routes;
