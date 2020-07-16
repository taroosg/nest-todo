import { ItemService, PublicItem } from "./item.service";
import { Item } from "../entities/item.entity";
import { CreateItemDTO, UpdateItemDTO, DeleteItemDTO } from "./item.dto";
import { DeleteResult, UpdateResult, InsertResult } from "typeorm";
export declare class ItemController {
    private readonly service;
    constructor(service: ItemService);
    getPublicItemList(): Promise<PublicItem[]>;
    getItemList(): Promise<Item[]>;
    addItem(item: CreateItemDTO): Promise<InsertResult>;
    getItem(id: string): Promise<Item>;
    update(id: string, itemData: UpdateItemDTO): Promise<UpdateResult>;
    delete(id: string): Promise<DeleteResult>;
    deleteItem(id: string, deleteItem: DeleteItemDTO): Promise<void>;
}
