import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { ProductImage } from '../product-image/product-image.schema';

export type OrderItemDocument = HydratedDocument<OrderItem>;

@Schema({
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  }
})
export class OrderItem {
  id: string;

// New Fields
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Order', required: true })
  orderId: Types.ObjectId;

  @Prop()
  product_title: string;

  @Prop()
  product_slug: string;

  @Prop()
  product_type: string;

  @Prop({ type: Array<Types.ObjectId>, ref: 'ProductImage' })
  images: ProductImage[];

  @Prop()
  barcode: string;

  @Prop()
  sku: string;

  @Prop({ type: Object})
  option: Record<string, string>;

  @Prop({ type: Object})
  presentment_prices: Record<string, any>;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product', required: true })
  product_id: Types.ObjectId;

  @Prop()
  requires_shipping: boolean;

  @Prop()
  taxable: boolean;

  @Prop()
  tax_code: string;

  @Prop()
  weight: string;

  @Prop()
  weight_unit: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'ProductVariant', required: true })
  variant_id: Types.ObjectId;

  @Prop()
  qty: number;

  @Prop()
  created_by: string;

  created_at: Date;

  @Prop()
  modified_by: string;

  modified_at: Date;
}

const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
// OrderItemSchema.virtual('images', {
//   ref: 'ProductImage',
//   localField: 'images',
//   foreignField: '_id',
// });
export { OrderItemSchema };
