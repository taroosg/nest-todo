"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItem1594821853318 = void 0;
class createItem1594821853318 {
    constructor() {
        this.name = 'createItem1594821853318';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "temporary_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "todo" varchar NOT NULL, "limit" datetime NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "isDone" boolean NOT NULL DEFAULT (0), "deletePassword" varchar NOT NULL DEFAULT ('root'))`);
        await queryRunner.query(`INSERT INTO "temporary_item"("id", "todo", "limit", "createdAt", "updatedAt", "isDone", "deletePassword") SELECT "id", "todo", "limit", "createdAt", "updatedAt", "idDone", "deletePassword" FROM "item"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`ALTER TABLE "temporary_item" RENAME TO "item"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "item" RENAME TO "temporary_item"`);
        await queryRunner.query(`CREATE TABLE "item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "todo" varchar NOT NULL, "limit" datetime NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "idDone" boolean NOT NULL DEFAULT (0), "deletePassword" varchar NOT NULL DEFAULT ('root'))`);
        await queryRunner.query(`INSERT INTO "item"("id", "todo", "limit", "createdAt", "updatedAt", "idDone", "deletePassword") SELECT "id", "todo", "limit", "createdAt", "updatedAt", "isDone", "deletePassword" FROM "temporary_item"`);
        await queryRunner.query(`DROP TABLE "temporary_item"`);
    }
}
exports.createItem1594821853318 = createItem1594821853318;
//# sourceMappingURL=1594821853318-create-item.js.map