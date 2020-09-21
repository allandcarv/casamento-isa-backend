import cron from 'node-cron';

import InstagramMediaController from '../../controllers/InstagramMediaController';

cron.schedule('*/10 * * * *', () => {
  InstagramMediaController.index(null, null);

  console.log('Loading Instagram Photos...');
});
