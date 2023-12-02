import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductVariant, ProductVariantSchema } from './product-variant.schema';
import { ProductVariantService } from './product-variant.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: ProductVariant.name,
        useFactory: () => {
          const schema = ProductVariantSchema;
          schema.pre('save', function () {
            // console.log('Hello from pre save');
          });
          return schema;
        }
      }
    ])
  ],
  providers: [ProductVariantService],
  exports: [ProductVariantService]
})
export class ProductVariantModule {}
