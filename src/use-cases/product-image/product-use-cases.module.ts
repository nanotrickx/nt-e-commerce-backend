import { Module } from '@nestjs/common';
import { MongoDbModule } from '@infra/db/mongo-db.module';
import { GetProductImageController } from './get/get.controller';
import { GetListProductImageController } from './get-list/get-list.controller';
import { CreateProductImageController } from './create/create.controller';
import { UpdateProductImageController } from './update/update.controller';
import { DeleteProductImageController } from './delete/delete.controller';
import { GetProductImageMapper } from './get/get-mapper';
import { CreateProductImageMapper } from './create/create-mapper';
import { UpdateProductImageMapper } from './update/update-mapper';
import { GetListProductImageMapper } from './get-list/get-list-mapper';

@Module({
  imports: [
    MongoDbModule,
  ],
  controllers: [
    GetProductImageController,
    GetListProductImageController,
    CreateProductImageController,
    UpdateProductImageController,
    DeleteProductImageController
  ],
  providers: [GetProductImageMapper, CreateProductImageMapper, UpdateProductImageMapper, GetListProductImageMapper]
})
export class ProductImageUseCasesModule {}
