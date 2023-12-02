import { Module } from '@nestjs/common';
import { MongoDbModule } from '@infra/db/mongo-db.module';
import { GetProductVariantController } from './get/get.controller';
import { GetListProductVariantController } from './get-list/get-list.controller';
import { CreateProductVariantController } from './create/create.controller';
import { UpdateProductVariantController } from './update/update.controller';
import { DeleteProductVariantController } from './delete/delete.controller';
import { GetProductVariantMapper } from './get/get-mapper';
import { GetListProductVariantMapper } from './get-list/get-list-mapper';
import { CreateProductVariantMapper } from './create/create-mapper';
import { UpdateProductVariantMapper } from './update/update-mapper';
import { BulkVariantReplaceProductVariantController } from './bulk-variant-replace/bulk-variant-replace.controller';
import { BulkVariantReplaceProductVariantMapper } from './bulk-variant-replace/bulk-variant-replace-mapper';

@Module({
  imports: [
    MongoDbModule,
  ],
  controllers: [
    GetProductVariantController,
    GetListProductVariantController,
    CreateProductVariantController,
    UpdateProductVariantController,
    DeleteProductVariantController,
    BulkVariantReplaceProductVariantController
  ],
  providers: [GetProductVariantMapper, GetListProductVariantMapper, CreateProductVariantMapper, UpdateProductVariantMapper, BulkVariantReplaceProductVariantMapper]
})
export class ProductVariantUseCasesModule {}
