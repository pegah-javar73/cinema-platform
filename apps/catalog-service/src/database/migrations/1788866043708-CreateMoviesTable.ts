import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMoviesTable1788866043708 implements MigrationInterface {
    name = 'CreateMoviesTable1788866043708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movies" ("id" uuid NOT NULL, "title" character varying(200) NOT NULL, "description" text NOT NULL, "release_year" integer NOT NULL, "rating" numeric(3,1) NOT NULL, "genres" text array NOT NULL DEFAULT '{}', CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "movies"`);
    }

}
