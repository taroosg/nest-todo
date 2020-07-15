import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm"; //追加！
import { ItemModule } from './item/item.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ItemModule], //追加！
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
