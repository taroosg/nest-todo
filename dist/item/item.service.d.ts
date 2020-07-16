import { Item } from "src/entities/item.entity";
import { CreateItemDTO } from "./item.dto";
import { Repository, InsertResult, UpdateResult, DeleteResult } from "typeorm";
export declare type PublicItem = Omit<Item, "deletePassword">;
export declare class ItemService {
    private readonly itemRepository;
    constructor(itemRepository: Repository<Item>);
    findAll(): Promise<Item[]>;
    findPublicAll(): Promise<PublicItem[]>;
    create(item: CreateItemDTO): Promise<InsertResult>;
    find(id: number): Promise<Item> | null;
    update(id: number, item: any): Promise<UpdateResult>;
    delete(id: number): Promise<DeleteResult>;
    deleteByPassword(id: number, deletePassword: string): Promise<DeleteResult>;
}
