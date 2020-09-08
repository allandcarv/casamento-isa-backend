import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import Hashtag from '../models/Hashtag';

interface IHashtag {
  user: string;
  photo: string;
}

class HashtagController {
  async index(request: Request, response: Response<IHashtag[]>): Promise<any> {
    const hashtag = getRepository(Hashtag);

    const hashtags = await hashtag.find();

    const result = hashtags.map<IHashtag>(h => {
      return {
        user: h.user,
        photo: h.photo,
      };
    });

    return response.json(result);
  }
}

export default new HashtagController();
