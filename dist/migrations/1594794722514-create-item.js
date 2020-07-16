"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItem1594794722514 = void 0;
class createItem1594794722514 {
    constructor() {
        this.name = 'createItem1594794722514';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "todo" varchar NOT NULL, "limit" datetime NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "item"`);
    }
}
exports.createItem1594794722514 = createItem1594794722514;
//# sourceMappingURL=1594794722514-create-item.js.map