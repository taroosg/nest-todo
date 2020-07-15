import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { ItemService } from "./item.service";
import { Item } from "../entities/item.entity";
import { CreateItemDTO } from "./item.dto";
import { DeleteResult, UpdateResult, InsertResult } from "typeorm";

@Controller("item")
export class ItemController {
  constructor(private readonly service: ItemService) {}

  @Get()
  async getItemList(): Promise<Item[]> {
    return await this.service.findAll();
  }

  @Post()
  async addItem(@Body() item: CreateItemDTO): Promise<InsertResult> {
    return await this.service.create(item);
  }

  @Get(":id")
  async getItem(@Param("id") id: string): Promise<Item> {
    return await this.service.find(Number(id));
  }

  @Put(":id/update")
  async update(
    @Param("id") id: string,
    @Body() itemData: Item,
  ): Promise<UpdateResult> {
    return await this.service.update(Number(id), itemData);
  }

  @Delete(":id/delete")
  async delete(@Param("id") id: string): Promise<DeleteResult> {
    return await this.service.delete(Number(id));
  }
}
