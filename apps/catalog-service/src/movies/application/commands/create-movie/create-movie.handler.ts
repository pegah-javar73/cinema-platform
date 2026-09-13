import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { randomUUID } from 'node:crypto';

import { CreateMovieCommand } from './create-movie.command.js';

import { Movie } from '../../../domain/entities/movie.entity.js';
import { MovieTitle } from '../../../domain/value-objects/movie-title.vo.js';
import { MovieRating } from '../../../domain/value-objects/movie-rating.vo.js';
import {
  MovieRepository,
} from '../../../domain/repositories/movie.repository.js';

@CommandHandler(CreateMovieCommand)
export class CreateMovieHandler
  implements ICommandHandler<CreateMovieCommand>
{
  constructor(

    private readonly movieRepository: MovieRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: CreateMovieCommand,
  ): Promise<string> {
    const movie = Movie.create({
      id: command.id || randomUUID(),
      title: new MovieTitle(command.title),
      description: command.description,
      releaseYear: command.releaseYear,
      rating: new MovieRating(command.rating),
      genres: command.genres,
    });

    await this.movieRepository.save(movie);

    // رویدادها بعد از ذخیره موفق منتشر می‌شوند
    this.eventBus.publishAll(movie.pullDomainEvents());

    return movie.id;
  }
}