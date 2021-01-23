import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createMovieDto } from './dto/create-movie.dto';
import { MovieEntity } from './movie.entity';
import { MoviesService } from './movies.service';
import { uploadFile } from './shared/file-upload.utils';
import { validateImages } from './shared/filters.utils';

@Controller('movies')
export class MoviesController {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    private readonly movieService: MoviesService,
  ) {}
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() movieData: createMovieDto, @UploadedFile() image) {
    if (image) {
      validateImages(image);
      movieData.image = await uploadFile(image);
    }

    return await this.movieService.create(movieData);
  }
}
