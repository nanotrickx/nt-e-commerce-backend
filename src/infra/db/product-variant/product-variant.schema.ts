import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type ProductVariantDocument = HydratedDocument<ProductVariant>;

export class presentmentPrices{
  price: PriceType;
  compare_at_price: PriceType;
}

class PriceType {
  currency_code: string;
  amount: number;
}

@Schema({
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  }
})
export class ProductVariant {
  id: string;

  @Prop()
  barcode: string;

  @Prop()
  created_by: string;

  @Prop()
  fulfillment_service: string;

  @Prop()
  grams: number;

  @Prop()
  image_id: string;

  @Prop()
  inventory_item_id: string;

  @Prop()
  inventory_management: string;

  @Prop()
  inventory_policy: string;

  @Prop()
  inventory_quantity: string;

  @Prop({ type: Object})
  option: Record<string, string>;

  @Prop({ type: Object})
  presentment_prices: Record<string, any>;

  @Prop()
  position: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product', required: true })
  product_id: Types.ObjectId;

  @Prop()
  requires_shipping: boolean;

  @Prop()
  sku: string;

  @Prop()
  taxable: boolean;

  @Prop()
  tax_code: string;

  @Prop()
  title: string;

  @Prop()
  weight: string;

  @Prop()
  weight_unit: string;

  @Prop({type: Date})
  created_at: Date;

  @Prop()
  modified_by: string;

  @Prop({type: Date})
  modified_at: Date;
}

const ProductVariantSchema = SchemaFactory.createForClass(ProductVariant);

export { ProductVariantSchema };
