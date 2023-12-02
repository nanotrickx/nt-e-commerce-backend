import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductImage, ProductImageSchema } from './product-image.schema';
import { ProductImageService } from './product-image.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: ProductImage.name,
        useFactory: () => {
          const schema = ProductImageSchema;
          schema.pre('save', function () {
            // console.log('Hello from pre save');
          });
          return schema;
        }
      }
    ])
  ],
  providers: [ProductImageService],
  exports: [ProductImageService]
})
export class ProductImageModule {}
