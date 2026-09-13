import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateMovieHandler } from './application/commands/create-movie/create-movie.handler.js';
import { MovieCreatedHandler } from './application/events/movie-created.handler.js';
import { GetMovieByIdHandler } from './application/queries/get-movie-by-id/get-movie-by-id.handler.js';
import { GetMoviesHandler } from './application/queries/get-movies/get-movies.handler.js';
import { MovieRepository } from './domain/repositories/movie.repository.js';
import { MovieOrmEntity } from './infrastructure/persistence/entities/movie.orm-entity.js';
import { TypeOrmMovieRepository } from './infrastructure/persistence/typeorm-movie.repository.js';
import { MoviesController } from './presentation/http/movies.controller.js';

const CommandHandlers = [CreateMovieHandler];
const QueryHandlers = [GetMoviesHandler, GetMovieByIdHandler];
const EventHandlers = [MovieCreatedHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([MovieOrmEntity])],
  controllers: [MoviesController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    {
      provide: MovieRepository,
      useClass: TypeOrmMovieRepository,
    },
  ],
})
export class MoviesModule {}
