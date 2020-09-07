import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('hashtags')
class Hashtag {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  photo: string;

  @Column()
  hashtag_id: string; //eslint-disable-line

  @Column()
  user: string;

  @CreateDateColumn()
  created_at: Date; //eslint-disable-line

  @UpdateDateColumn()
  updated_at: Date; //eslint-disable-line
}

export default Hashtag;
