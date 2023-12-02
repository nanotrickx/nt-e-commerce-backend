import { Module } from '@nestjs/common';
import { MongoDbModule } from '@infra/db/mongo-db.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '@infra/db/product/product.schema';
import { ProductSlugCheck } from '@common/product/slug-validator';
import { Category, CategorySchema } from '@infra/db/category/category.schema';
import { CreateCategoryController } from './create/create.controller';
import { GetCategoryController } from './get/get.controller';
import { GetListCategoryController } from './get-list/get-list.controller';
import { UpdateCategoryController } from './update/update.controller';
import { DeleteCategoryController } from './delete/delete.controller';
import { CreateCategoryMapper } from './create/create-mapper';
import { GetCategoryMapper } from './get/get-mapper';
import { GetListCategoryMapper } from './get-list/get-list-mapper';
import { UpdateCategoryMapper } from './update/update-mapper';
import { CategorySlugCheck } from '@common/category/slug-validator';

@Module({
  imports: [
    MongoDbModule,
    MongooseModule.forFeature([
        {
            name: Category.name,
            schema: CategorySchema
        }
    ])
  ],
  controllers: [
    CreateCategoryController,
    GetCategoryController,
    GetListCategoryController,
    UpdateCategoryController,
    DeleteCategoryController
  ],
  providers: [CreateCategoryMapper, CategorySlugCheck, GetCategoryMapper, GetListCategoryMapper, UpdateCategoryMapper]
})
export class CategoryUseCasesModule {}
