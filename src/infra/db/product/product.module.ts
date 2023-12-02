import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: () => {
          const schema = ProductSchema;
          schema.pre('save', function () {
            // console.log('Hello from pre save');
          });
          return schema;
        }
      }
    ])
  ],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
