import axios from 'axios';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Hashtag from '../models/Hashtag';

interface IInstagramResponse {
  graphql: {
    hashtag: {
      edge_hashtag_to_media: { //eslint-disable-line
        edges: [
          {
            node: {
              id: string;
              owner: {
                id: string;
              };
              thumbnail_src: string;//eslint-disable-line
            };
          },
        ];
      };
    };
  };
}

interface IResponse {
  photo: string;
  user: string;
  hashtag_id: string; //eslint-disable-line
}

class InstagramHashtagController {
  public async index(request: Request, response: Response): Promise<any> {
    const ormRepository = getRepository(Hashtag);

    const hashtag = 'casamentobelinhaeleo';

    const { data } = await axios.get<IInstagramResponse>(
      `https://www.instagram.com/explore/tags/${hashtag}/?__a=1`,
    );

    const returnJson = await data.graphql.hashtag.edge_hashtag_to_media.edges.reduce(
      async (previous: Promise<IResponse[]>, current) => {
        const acc = await previous;

        const registeredHashtag = await ormRepository.findOne({
          where: {
            hashtag_id: current.node.id,
          },
        });

        if (!registeredHashtag) {
          const { data: instagramData } = await axios.get(
            `https://i.instagram.com/api/v1/users/${current.node.owner.id}/info/`,
            {
              headers: {
                'User-Agent':
                  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 Instagram 12.0.0.16.90 (iPhone9,4; iOS 10_3_3; en_US; en-US; scale=2.61; gamut=wide; 1080x1920)',
              },
            },
          );

          const newObject = {
            hashtag_id: current.node.id,
            user: instagramData.user.username,
            photo: current.node.thumbnail_src,
          };

          acc.push({ ...newObject });

          const newHashtag = ormRepository.create(newObject);

          await ormRepository.save(newHashtag);
        }

        return acc;
      },
      Promise.resolve([]),
    );

    return response.json(returnJson);
  }
}

export default new InstagramHashtagController();
