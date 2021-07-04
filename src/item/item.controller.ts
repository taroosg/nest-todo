import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ItemService, PublicItem } from "./item.service";
import { Item } from "../entities/item.entity";
import { CreateItemDTO, UpdateItemDTO, DeleteItemDTO } from "./item.dto";
import { DeleteResult, UpdateResult, InsertResult } from "typeorm";

@Controller("item")
export class ItemController {
  constructor(private readonly service: ItemService) {}

  @Get()
  async getPublicItemList(): Promise<PublicItem[]> {
    return await this.service.findPublicAll();
  }

  @Get("all")
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
    @Body() itemData: UpdateItemDTO,
  ): Promise<UpdateResult> {
    const newData = !itemData.isDone ? itemData : {
      ...itemData,
      ...{ isDone: itemData.isDone.toLowerCase() === "true" },
    };
    return await this.service.update(Number(id), newData);
  }

  @Delete(":id/delete")
  async delete(@Param("id") id: string): Promise<DeleteResult> {
    return await this.service.delete(Number(id));
  }

  @Post(":id/delete")
  async deleteItem(
    @Param("id") id: string,
    @Body() deleteItem: DeleteItemDTO,
  ) {
    const item = await this.service.find(Number(id));
    if (!item) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Missing item(id: ${id}).`,
        },
        404,
      );
    }
    try {
      await this.service.deleteByPassword(
        Number(id),
        deleteItem.deletePassword,
      );
    } catch (e) {
      // パスワード間違い
      if (e.message === "Incorrect password") {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: "Incorrect password",
          },
          403,
        );
      }
      // パスワード合ってるけどなんかイマイチだったとき
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Internal server error.",
        },
        500,
      );
    }
    return;
  }
}
