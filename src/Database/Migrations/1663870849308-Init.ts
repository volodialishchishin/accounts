import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1663870849308 implements MigrationInterface {
    name = 'Init1663870849308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Account" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "balance" integer NOT NULL, "bank_account_number" integer NOT NULL, "user_id" integer, CONSTRAINT "PK_bf68fd30f1adeede9c72a5cac09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_99f220333df04d5f74f6db26c07" UNIQUE ("name"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Account" ADD CONSTRAINT "FK_8b3e6be2210447d7f915f772fcf" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Account" DROP CONSTRAINT "FK_8b3e6be2210447d7f915f772fcf"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "Account"`);
    }

}
