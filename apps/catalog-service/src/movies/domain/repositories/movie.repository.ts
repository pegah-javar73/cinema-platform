import { Movie } from '../entities/movie.entity.js';

export abstract class MovieRepository {
  abstract save(movie: Movie): Promise<void>;
  abstract findAll(): Promise<Movie[]>;
  abstract findById(id: string): Promise<Movie | null>;
}
