import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateMovieCommand } from '../../application/commands/create-movie/create-movie.command.js';
import { GetMovieByIdQuery } from '../../application/queries/get-movie-by-id/get-movie-by-id.query.js';
import { GetMoviesQuery } from '../../application/queries/get-movies/get-movies.query.js';
import { CreateMovieDto } from './dto/create-movie.dto.js';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() body: CreateMovieDto) {
    const id = await this.commandBus.execute<CreateMovieCommand, string>(
      new CreateMovieCommand(
        body.id,
        body.title,
        body.description,
        body.releaseYear,
        body.rating,
        body.genres,
      ),
    );

    return { id };
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetMoviesQuery());
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.queryBus.execute(new GetMovieByIdQuery(id));
  }
}
