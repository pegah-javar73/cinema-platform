import { Movie } from '../../../domain/entities/movie.entity.js';
import { MovieRating } from '../../../domain/value-objects/movie-rating.vo.js';
import { MovieTitle } from '../../../domain/value-objects/movie-title.vo.js';
import { MovieOrmEntity } from '../entities/movie.orm-entity.js';

export class MovieMapper {
  static toDomain(row: MovieOrmEntity): Movie {
    return Movie.reconstitute({
      id: row.id,
      title: new MovieTitle(row.title),
      description: row.description,
      releaseYear: row.releaseYear,
      rating: new MovieRating(row.rating),
      genres: row.genres,
    });
  }

  static toPersistence(movie: Movie): MovieOrmEntity {
    const row = new MovieOrmEntity();
    row.id = movie.id;
    row.title = movie.title.getValue();
    row.description = movie.description;
    row.releaseYear = movie.releaseYear;
    row.rating = movie.rating.getValue();
    row.genres = movie.genres;
    return row;
  }
}
