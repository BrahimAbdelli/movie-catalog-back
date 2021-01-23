import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createMovieDto } from './dto/create-movie.dto';
import { updateMovieDto } from './dto/update-movie-dto';
import { MovieEntity } from './movie.entity';
import { MoviesService } from './movies.service';
import { uploadFile } from './shared/file-upload.utils';
import { validateImages } from './shared/filters.utils';
import { findByField } from './shared/findByField.utils';
import { ValidateObjectIdPipe } from './shared/pipes/validateObjectId.pipe';

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
  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param(new ValidateObjectIdPipe('Movie')) params,
    @Body() movieData: updateMovieDto,
    @UploadedFile() image,
  ) {
    const toUpdate = await findByField(
      this.movieRepository,
      { _id: params.id },
      true,
    );
    if (image) {
      validateImages(image);
      movieData.image = await uploadFile(image);
    }
    return await this.movieService.update(toUpdate, movieData);
  }
  @Get('/:id')
  async findMe(
    @Param(new ValidateObjectIdPipe('Movie')) params,
  ): Promise<MovieEntity> {
    // throws error 404 if not found
    return await findByField(this.movieRepository, { _id: params.id }, true);
  }
}
