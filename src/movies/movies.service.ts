import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createMovieDto } from './dto/create-movie.dto';
import { MovieEntity } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async create(dto: createMovieDto): Promise<MovieEntity> {
    const newMovie = Object.assign(new MovieEntity(), dto);
    return await this.movieRepository.save(newMovie);
  }
}
