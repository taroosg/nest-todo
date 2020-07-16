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
exports.ItemService = void 0;
const common_1 = require("@nestjs/common");
const item_entity_1 = require("../entities/item.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let ItemService = class ItemService {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async findAll() {
        return await this.itemRepository.find();
    }
    async findPublicAll() {
        const items = await this.itemRepository.find();
        return items.map((x) => {
            return { id: x.id, todo: x.todo, limit: x.limit, isDone: x.isDone };
        });
    }
    async create(item) {
        return await this.itemRepository.insert(item);
    }
    async find(id) {
        return await this.itemRepository.findOne({ id: id });
    }
    async update(id, item) {
        return await this.itemRepository.update(id, item);
    }
    async delete(id) {
        return await this.itemRepository.delete(id);
    }
    async deleteByPassword(id, deletePassword) {
        const targetItem = await this.find(id);
        if (!targetItem) {
            return Promise.reject(new Error("Missing Item."));
        }
        if (targetItem.deletePassword !== deletePassword) {
            return Promise.reject(new Error("Incorrect password"));
        }
        return await this.itemRepository.delete(id);
    }
};
ItemService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(item_entity_1.Item)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ItemService);
exports.ItemService = ItemService;
//# sourceMappingURL=item.service.js.map