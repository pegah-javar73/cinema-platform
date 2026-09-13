export class MovieTitle {
  private readonly value: string;

  constructor(value: string) {
    const normalizedValue = value.trim();

    if (!normalizedValue) {
      throw new Error('Movie title cannot be empty');
    }

    if (normalizedValue.length > 200) {
      throw new Error(
        'Movie title cannot exceed 200 characters',
      );
    }

    this.value = normalizedValue;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: MovieTitle): boolean {
    return this.value === other.value;
  }
}