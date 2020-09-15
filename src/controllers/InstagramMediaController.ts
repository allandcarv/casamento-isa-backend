import axios from 'axios';
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

import Media from '../models/Media';

interface IId {
  id: string;
}

class InstagramMediaController {
  public async index(
    request: Request | null,
    response: Response | null,
  ): Promise<any> {
    const connection = getConnection();

    const ormRepository = connection.getRepository(Media);

    const token =
      'IGQVJWZAHBudXlPdV9pNTBuUG40SmlyVk5XWmJwWDRBZAHZAndU1EaVEwOERDMlFLNVFXaExZARnFyREV5bzJWcDdYbjVRSTI0djU4QWZA4OTB4QmhNTGVRYzZA6QTB6Q2ZAFcHNEdXNDQm1CR191RW1TOGVlSwZDZD';

    const { data } = await axios.get(
      `https://graph.instagram.com/me/media?access_token=${token}`,
    );

    data.data.forEach(async (id: IId) => {
      const registeredId = await ormRepository.findOne({
        where: {
          media_id: id.id,
        },
      });

      if (!registeredId) {
        const mediaData = await axios.get(
          `https://graph.instagram.com/${id.id}?fields=media_url,permalink&access_token=${token}`,
        );

        const newMedia = ormRepository.create({
          media_id: id.id,
          media_url: mediaData.data.media_url,
          permalink: mediaData.data.permalink,
        });

        await ormRepository.save(newMedia);
      }
    });

    return response?.json();
  }
}

export default new InstagramMediaController();
