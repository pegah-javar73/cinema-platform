import { IEvent } from '@nestjs/cqrs';

export class MovieCreatedEvent implements IEvent {
  constructor(
    readonly movieId: string,
    readonly title: string,
    readonly rating: number,
  ) {}
}
