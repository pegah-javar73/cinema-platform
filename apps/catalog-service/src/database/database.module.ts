import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieOrmEntity } from '../movies/infrastructure/persistence/entities/movie.orm-entity.js';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.getOrThrow<string>('DATABASE_URL'),
        entities: [MovieOrmEntity],
        // schema فقط از طریق migration تغییر می‌کند: pnpm migration:run
        synchronize: false,
        logging: config.get('DB_LOGGING') === 'true',
      }),
    }),
  ],
})
export class DatabaseModule {}
