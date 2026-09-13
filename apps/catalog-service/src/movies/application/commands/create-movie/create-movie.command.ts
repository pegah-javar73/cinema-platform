export class CreateMovieCommand {
  constructor(
    public readonly id: string | undefined,
    public readonly title: string,
    public readonly description: string,
    public readonly releaseYear: number,
    public readonly rating: number,
    public readonly genres: string[],
  ) {}
}