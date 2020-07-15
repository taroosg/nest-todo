import { Module } from "@nestjs/common";
import { ItemService } from "./item.service";
import { Item } from "src/entities/item.entity"; //追加！
import { TypeOrmModule } from "@nestjs/typeorm"; //追加！
import { ItemController } from "./item.controller";

@Module({
  controllers: [ItemController],
  imports: [TypeOrmModule.forFeature([Item])], // 追加！
  providers: [ItemService],
})
export class ItemModule {}
