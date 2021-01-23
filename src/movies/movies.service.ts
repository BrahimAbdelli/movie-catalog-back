import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createMovieDto } from './dto/create-movie.dto';
import { updateMovieDto } from './dto/update-movie-dto';
import { MovieEntity } from './movie.entity';
import { cleaner } from './shared/file-cleaner.utils';

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

  async update(
    toUpdate: MovieEntity,
    dto: updateMovieDto,
  ): Promise<MovieEntity> {
    if (dto.image && toUpdate.image !== dto.image) {
      cleaner(toUpdate.image);
    }
    Object.assign(toUpdate, dto);
    return await this.movieRepository.save(toUpdate);
  }
}
