import { Module } from '@nestjs/common';
import { MongoDbModule } from '@infra/db/mongo-db.module';
import { CreateProductController } from './create/create.controller';
import { CreateProductMapper } from './create/create-mapper';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '@infra/db/product/product.schema';
import { ProductSlugCheck } from '@common/product/slug-validator';
import { GetProductController } from './get/get.controller';
import { GetProductMapper } from './get/get-mapper';
import { GetlistProductController } from './getlist/getlist.controller';
import { GetlistProductMapper } from './getlist/getlist-mapper';
import { UpdateProductController } from './update/update.controller';
import { UpdateProductMapper } from './update/update-mapper';
import { DeleteController } from './delete/delete.controller';

@Module({
  imports: [
    MongoDbModule,
    MongooseModule.forFeature([
        {
            name: Product.name,
            schema: ProductSchema
        }
    ])
  ],
  controllers: [
    CreateProductController,
    GetProductController,
    GetlistProductController,
    UpdateProductController,
    DeleteController
  ],
  providers: [CreateProductMapper, ProductSlugCheck, GetProductMapper, GetlistProductMapper, UpdateProductMapper]
})
export class ProductUseCasesModule {}
