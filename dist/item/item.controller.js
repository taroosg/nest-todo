"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemController = void 0;
const common_1 = require("@nestjs/common");
const item_service_1 = require("./item.service");
const item_dto_1 = require("./item.dto");
let ItemController = class ItemController {
    constructor(service) {
        this.service = service;
    }
    async getPublicItemList() {
        return await this.service.findPublicAll();
    }
    async getItemList() {
        return await this.service.findAll();
    }
    async addItem(item) {
        return await this.service.create(item);
    }
    async getItem(id) {
        return await this.service.find(Number(id));
    }
    async update(id, itemData) {
        const newData = !itemData.isDone ? itemData : Object.assign(Object.assign({}, itemData), { isDone: itemData.isDone.toLowerCase() === "true" });
        return await this.service.update(Number(id), newData);
    }
    async delete(id) {
        return await this.service.delete(Number(id));
    }
    async deleteItem(id, deleteItem) {
        const item = this.service.find(Number(id));
        if (!item) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: `Missing item(id: ${id}).`,
            }, 404);
        }
        try {
            await this.service.deleteByPassword(Number(id), deleteItem.deletePassword);
        }
        catch (e) {
            if (e.message === "Incorrect password") {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.FORBIDDEN,
                    error: "Incorrect password",
                }, 403);
            }
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Internal server error.",
            }, 500);
        }
        return;
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "getPublicItemList", null);
__decorate([
    common_1.Get("all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "getItemList", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [item_dto_1.CreateItemDTO]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "addItem", null);
__decorate([
    common_1.Get(":id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "getItem", null);
__decorate([
    common_1.Put(":id/update"),
    __param(0, common_1.Param("id")),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, item_dto_1.UpdateItemDTO]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "update", null);
__decorate([
    common_1.Delete(":id/delete"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "delete", null);
__decorate([
    common_1.Post(":id/delete"),
    __param(0, common_1.Param("id")),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, item_dto_1.DeleteItemDTO]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "deleteItem", null);
ItemController = __decorate([
    common_1.Controller("item"),
    __metadata("design:paramtypes", [item_service_1.ItemService])
], ItemController);
exports.ItemController = ItemController;
//# sourceMappingURL=item.controller.js.map