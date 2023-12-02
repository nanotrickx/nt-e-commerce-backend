import { AddressTypeDefinition } from '@common/address';
import { OrderStatusType, PaymentTransactionsType, ProductVariantListInput } from '@common/types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import { OrderItem } from '../order-item/order-item.schema';
import { OrderStatus } from '@common/order';

export type OrderDocument = HydratedDocument<Order>;

@Schema({
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  }
})
export class Order {
  id: string;

  @Prop({type: ProductVariantListInput})
  productVariantList: Array<Record<string, string>>;

  @Prop({type: AddressTypeDefinition})
  buyerAddress: Record<string, string>;

  @Prop({type: AddressTypeDefinition})
  shippingAddress: Record<string, string>;

  @Prop()
  subTotal: number;

  @Prop()
  total: number;

  @Prop()
  tax: number;

  @Prop()
  shippingCost: number;

  @Prop()
  paymentMode: string;

  @Prop({type: PaymentTransactionsType})
  paymentTransactions: Array<Record<string, string>>;

  @Prop()
  mobile: string;

  @Prop()
  isMobileVerified: boolean;

  @Prop()
  email: string;

  @Prop()
  isEmailVerified: boolean;

  @Prop({type: OrderStatusType})
  orderStatus: Array<Record<string, string| number>>;

  @Prop()
  notes: Array<string>;

  @Prop()
  sessionId: string;

  @Prop()
  accountId: string;

  @Prop()
  currencyCode: string;

  @Prop()
  status: OrderStatus;

  @Prop()
  timestamp: string;

  items: Array<Record<string,any>>;

  @Prop()
  created_by: string;

  created_at: Date;

  @Prop()
  modified_by: string;

  modified_at: Date;
}

const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.virtual('items', {
  ref: 'OrderItem',
  localField: '_id',
  foreignField: 'orderId',
});

export { OrderSchema };
