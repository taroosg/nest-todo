import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm"; //追加！
import { ItemModule } from "./item/item.module";
import { Item } from "./entities/item.entity";

@Module({
  imports: [
    ItemModule,
    TypeOrmModule.forRoot({
      "type": "sqlite",
      "database": "data/dev.sqlite",
      "entities": [
        Item,
      ],
      "migrations": [__dirname + "/migrations/**/*{.ts,.js}"],
      "logging": true,
    }),
  ], //追加！
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
