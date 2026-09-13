import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MovieDto, toMovieDto } from '../get-movies/get-movies.handler.js';
import { MovieRepository } from '../../../domain/repositories/movie.repository.js';
import { GetMovieByIdQuery } from './get-movie-by-id.query.js';

@QueryHandler(GetMovieByIdQuery)
export class GetMovieByIdHandler implements IQueryHandler<GetMovieByIdQuery> {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(query: GetMovieByIdQuery): Promise<MovieDto> {
    const movie = await this.movieRepository.findById(query.id);
    if (!movie) {
      throw new NotFoundException(`Movie with id "${query.id}" not found`);
    }
    return toMovieDto(movie);
  }
}
