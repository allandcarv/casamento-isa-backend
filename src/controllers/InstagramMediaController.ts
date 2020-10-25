import axios from 'axios';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { parseISO, addWeeks, isAfter } from 'date-fns';

import Media from '../models/Media';

interface IId {
  id: string;
}

class InstagramMediaController {
  public async index(
    request: Request | null,
    response: Response | null,
  ): Promise<any> {
    const ormRepository = getRepository(Media);

    const token =
      'IGQVJWZAHBudXlPdV9pNTBuUG40SmlyVk5XWmJwWDRBZAHZAndU1EaVEwOERDMlFLNVFXaExZARnFyREV5bzJWcDdYbjVRSTI0djU4QWZA4OTB4QmhNTGVRYzZA6QTB6Q2ZAFcHNEdXNDQm1CR191RW1TOGVlSwZDZD';

    const { data } = await axios.get(
      `https://graph.instagram.com/me/media?access_token=${token}`,
    );

    data.data.forEach(async (media: IId) => {
      const registeredId = await ormRepository.findOne({
        where: {
          media_id: media.id,
        },
      });

      if (!registeredId) {
        const mediaData = await axios.get(
          `https://graph.instagram.com/${media.id}?fields=media_url,permalink&access_token=${token}`,
        );

        const newMedia = ormRepository.create({
          media_id: media.id,
          media_url: mediaData.data.media_url,
          permalink: mediaData.data.permalink,
        });

        await ormRepository.save(newMedia);
      }
    });

    const registeredMedia = await ormRepository.find();

    registeredMedia.forEach(async media => {
      let mediaToRemove: Media[] = [];
      const hasPhoto = data.data.some((m: IId) => m.id === media.media_id);

      const moreThan2Weeks = addWeeks(parseISO(String(media.created_at)), 2);
      const expiredDate = isAfter(new Date(), moreThan2Weeks);

      if (!hasPhoto || expiredDate) {
        mediaToRemove = await ormRepository.find({
          where: { media_id: media.media_id },
        });
      }

      if (mediaToRemove) {
        await ormRepository.remove(mediaToRemove);
      }
    });

    return response?.json();
  }
}

export default new InstagramMediaController();
