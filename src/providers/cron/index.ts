import cron from 'node-cron';

import InstagramMediaController from '../../controllers/InstagramMediaController';

cron.schedule('*/1 * * * *', () => {
  InstagramMediaController.index(null, null);

  console.log('Media loaded');
});
