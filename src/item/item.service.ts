import { Injectable } from "@nestjs/common";
import { Item } from "src/entities/item.entity"; //追加！
import { CreateItemDTO } from "./item.dto"; //追加！
import { Repository, InsertResult, UpdateResult, DeleteResult } from "typeorm"; //追加！
import { InjectRepository } from "@nestjs/typeorm"; //追加！

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) //追加！
     private readonly itemRepository: Repository<Item>, //追加！
  ) {}

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async findPublicAll(): Promise<Item[]> {
    const items = await this.itemRepository.find();
    return items.map((x) => {
      return { id: x.id, todo: x.todo, limit: x.limit, isDone: x.isDone };
    });
  }

  async create(item: CreateItemDTO): Promise<InsertResult> {
    return await this.itemRepository.insert(item);
  }

  async find(id: number): Promise<Item> | null {
    return await this.itemRepository.findOne({ id: id });
  }

  async update(id: number, item): Promise<UpdateResult> {
    return await this.itemRepository.update(id, item);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.itemRepository.delete(id);
  }

  async deleteByPassword(
    id: number,
    deletePassword: string,
  ): Promise<DeleteResult> {
    const targetItem = await this.find(id);
    if (!targetItem) {
      return Promise.reject(new Error("Missing Item."));
    }
    if (targetItem.deletePassword !== deletePassword) {
      return Promise.reject(new Error("Incorrect password"));
    }
    return await this.itemRepository.delete(id);
  }
}
