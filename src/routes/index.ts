import { Router } from 'express';

import ConfirmationController from '../controllers/CofirmationController';
import MediaController from '../controllers/MediaController';
import InstagramMediaController from '../controllers/InstagramMediaController';

const routes = Router();

routes.get('/media', InstagramMediaController.index);
routes.get('/photos', MediaController.index);

routes.post('/confirmation', ConfirmationController.create);

export default routes;
