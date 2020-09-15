import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import Media from '../models/Media';

interface IMedia {
  media_url: string; //eslint-disable-line
  permalink: string;
}

class MediaController {
  async index(request: Request, response: Response<IMedia[]>): Promise<any> {
    const mediaRepository = getRepository(Media);

    const photos = await mediaRepository.find();

    const result = photos.map<IMedia>(media => {
      return {
        media_url: media.media_url,
        permalink: media.permalink,
      };
    });

    return response.json(result);
  }
}

export default new MediaController();
