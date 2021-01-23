import { IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { ObjectID } from 'mongodb';

export class createMovieDto {
  @IsNotEmpty()
  _id?: ObjectID;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsDateString()
  releaseDate: string;

  @IsNotEmpty()
  rating: string;

  @IsNotEmpty()
  @IsString()
  genre: string;

  @IsNotEmpty()
  image: string;
}
