import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MovieRepository } from '../../../domain/repositories/movie.repository.js';
import { GetMoviesQuery } from './get-movies.query.js';

import { Movie } from '../../../domain/entities/movie.entity.js';

export interface MovieDto {
  id: string;
  title: string;
  description: string;
  releaseYear: number;
  rating: number;
  genres: string[];
}

export function toMovieDto(movie: Movie): MovieDto {
  return {
    id: movie.id,
    title: movie.title.getValue(),
    description: movie.description,
    releaseYear: movie.releaseYear,
    rating: movie.rating.getValue(),
    genres: movie.genres,
  };
}

@QueryHandler(GetMoviesQuery)
export class GetMoviesHandler implements IQueryHandler<GetMoviesQuery> {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(): Promise<MovieDto[]> {
    const movies = await this.movieRepository.findAll();
    return movies.map(toMovieDto);
  }
}
