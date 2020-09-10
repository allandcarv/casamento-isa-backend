import { CronJob } from 'cron';

import InstagramHashtagController from '../../controllers/InstagramHashtagController';

const job = new CronJob('* */30 * * * *', () => {
  InstagramHashtagController.index(null, null);

  console.log('Hashtags loaded');
});

export default job;
