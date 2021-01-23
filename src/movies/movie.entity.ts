import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { ObjectID } from 'mongodb';
import { transformEntity } from './shared/transformEntity.utils';

@Entity('movie')
export class MovieEntity {
  @Transform(transformEntity)
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  title: string;

  @Column()
  releaseDate: string;

  @Column({ type: 'real' })
  rating: string;

  @Column()
  genre: string;

  @Column()
  image: string;
}
