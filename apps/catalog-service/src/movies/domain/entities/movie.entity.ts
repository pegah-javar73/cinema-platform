import { MovieCreatedEvent } from '../events/movie-created.event.js';
import { MovieTitle } from '../value-objects/movie-title.vo.js';
import { MovieRating } from '../value-objects/movie-rating.vo.js';

type MovieProps = {
  id: string;
  title: MovieTitle;
  description: string;
  releaseYear: number;
  rating: MovieRating;
  genres: string[];
};

export class Movie {
  private readonly domainEvents: MovieCreatedEvent[] = [];

  private constructor(
    private readonly props: MovieProps,
  ) {}

  static create(props: MovieProps): Movie {
    if (props.releaseYear < 1888) {
      throw new Error(
        'Invalid movie release year',
      );
    }

    const movie = new Movie(props);

    movie.domainEvents.push(
      new MovieCreatedEvent(
        props.id,
        props.title.getValue(),
        props.rating.getValue(),
      ),
    );

    return movie;
  }

  // بازسازی از دیتابیس: فیلم از قبل وجود دارد، پس رویداد جدیدی تولید نمی‌شود
  static reconstitute(props: MovieProps): Movie {
    return new Movie(props);
  }

  pullDomainEvents(): MovieCreatedEvent[] {
    return this.domainEvents.splice(0, this.domainEvents.length);
  }

  get id(): string {
    return this.props.id;
  }

  get title(): MovieTitle {
    return this.props.title;
  }

  get description(): string {
    return this.props.description;
  }

  get releaseYear(): number {
    return this.props.releaseYear;
  }

  get rating(): MovieRating {
    return this.props.rating;
  }

  get genres(): string[] {
    return [...this.props.genres];
  }
}