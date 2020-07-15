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

  async create(item: CreateItemDTO): Promise<InsertResult> {
    return await this.itemRepository.insert(item);
  }

  async find(id: number): Promise<Item> | null {
    return await this.itemRepository.findOne({ id: id });
  }

  async update(id: number, item: Item): Promise<UpdateResult> {
    return await this.itemRepository.update(id, item);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.itemRepository.delete(id);
  }
}
