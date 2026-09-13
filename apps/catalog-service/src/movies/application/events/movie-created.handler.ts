import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MovieCreatedEvent } from '../../domain/events/movie-created.event.js';

@EventsHandler(MovieCreatedEvent)
export class MovieCreatedHandler implements IEventHandler<MovieCreatedEvent> {
  private readonly logger = new Logger(MovieCreatedHandler.name);

  handle(event: MovieCreatedEvent): void {
    this.logger.log(`Movie created: ${event.movieId} — "${event.title}"`);
  }
}
