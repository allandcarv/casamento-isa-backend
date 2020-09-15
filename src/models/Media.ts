import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity()
class Media {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  media_id: String; //eslint-disable-line

  @Column()
  media_url: string; //eslint-disable-line

  @Column()
  permalink: string; //eslint-disable-line

  @CreateDateColumn()
  created_at: Date; //eslint-disable-line

  @UpdateDateColumn()
  updated_at: Date; //eslint-disable-line
}

export default Media;
