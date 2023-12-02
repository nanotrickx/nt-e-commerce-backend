import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.schema';
import { OrderService } from './order.service';
import { ProductVariantModule } from '../product-variant/product-variant.module';
import { OrderItemModule } from '../order-item/order-item.module';
import { VerifiedMobileNumberModule } from '../verified-mobile-number/verified-mobile-number.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Order.name,
        useFactory: () => {
          const schema = OrderSchema;
          schema.pre('save', function () {
            // console.log('Hello from pre save');
          });
          return schema;
        }
      }
    ]),
    ProductVariantModule,
    OrderItemModule,
    VerifiedMobileNumberModule
  ],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule {}
