import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { MovieOrmEntity } from '../movies/infrastructure/persistence/entities/movie.orm-entity.js';

// این فایل فقط برای TypeORM CLI است؛ خود اپلیکیشن از DatabaseModule استفاده می‌کند.
config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [MovieOrmEntity],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
});
