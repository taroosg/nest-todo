import {MigrationInterface, QueryRunner} from "typeorm";

export class createItem1594804947521 implements MigrationInterface {
    name = 'createItem1594804947521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "todo" varchar NOT NULL, "limit" datetime NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "idDone" boolean NOT NULL DEFAULT (0), "deletePassword" varchar NOT NULL DEFAULT ('root'))`);
        await queryRunner.query(`INSERT INTO "temporary_item"("id", "todo", "limit", "createdAt", "updatedAt") SELECT "id", "todo", "limit", "createdAt", "updatedAt" FROM "item"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`ALTER TABLE "temporary_item" RENAME TO "item"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" RENAME TO "temporary_item"`);
        await queryRunner.query(`CREATE TABLE "item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "todo" varchar NOT NULL, "limit" datetime NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "item"("id", "todo", "limit", "createdAt", "updatedAt") SELECT "id", "todo", "limit", "createdAt", "updatedAt" FROM "temporary_item"`);
        await queryRunner.query(`DROP TABLE "temporary_item"`);
    }

}
