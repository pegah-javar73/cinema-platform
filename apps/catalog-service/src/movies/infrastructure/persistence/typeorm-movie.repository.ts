import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../../domain/entities/movie.entity.js';
import { MovieRepository } from '../../domain/repositories/movie.repository.js';
import { MovieOrmEntity } from './entities/movie.orm-entity.js';
import { MovieMapper } from './mappers/movie.mapper.js';

@Injectable()
export class TypeOrmMovieRepository extends MovieRepository {
  constructor(
    @InjectRepository(MovieOrmEntity)
    private readonly repository: Repository<MovieOrmEntity>,
  ) {
    super();
  }

  async save(movie: Movie): Promise<void> {
    await this.repository.save(MovieMapper.toPersistence(movie));
  }

  async findAll(): Promise<Movie[]> {
    const rows = await this.repository.find({ order: { title: 'ASC' } });
    return rows.map((row) => MovieMapper.toDomain(row));
  }

  async findById(id: string): Promise<Movie | null> {
    const row = await this.repository.findOne({ where: { id } });
    return row ? MovieMapper.toDomain(row) : null;
  }
}
