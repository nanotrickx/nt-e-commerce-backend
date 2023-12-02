import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderItem, OrderItemSchema } from './order-item.schema';
import { OrderItemService } from './order-item.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: OrderItem.name,
        useFactory: () => {
          const schema = OrderItemSchema;
          schema.pre('save', function () {
            // console.log('Hello from pre save');
          });
          return schema;
        }
      }
    ])
  ],
  providers: [OrderItemService],
  exports: [OrderItemService]
})
export class OrderItemModule {}
