import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('movies')
export class MovieOrmEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 200 })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'int', name: 'release_year' })
  releaseYear!: number;

  // numeric از درایور pg به صورت string برمی‌گردد
  @Column({
    type: 'numeric',
    precision: 3,
    scale: 1,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    },
  })
  rating!: number;

  @Column({ type: 'text', array: true, default: () => "'{}'" })
  genres!: string[];
}
