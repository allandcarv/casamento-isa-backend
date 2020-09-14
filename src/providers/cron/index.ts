import cron from 'node-cron';

import InstagramHashtagController from '../../controllers/InstagramHashtagController';

cron.schedule('*/10 * * * *', () => {
  InstagramHashtagController.index(null, null);

  console.log('Hashtags loaded');
});
