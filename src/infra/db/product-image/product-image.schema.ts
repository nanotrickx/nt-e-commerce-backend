import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Product } from '../product/product.schema';

export type ProductImageDocument = HydratedDocument<ProductImage>;

@Schema({
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  }
})
export class ProductImage {
  id: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product', required: true })
  product_id: Types.ObjectId;

  @Prop()
  position: string;

  @Prop()
  alt: string;

  @Prop()
  width: number;

  @Prop()
  height: number;

  @Prop()
  src: string;

  @Prop()
  created_by: string;

  @Prop({type: Date})
  created_at: Date;

  @Prop()
  modified_by: string;

  @Prop({type: Date})
  modified_at: Date;
}

const ProductImageSchema = SchemaFactory.createForClass(ProductImage);

export { ProductImageSchema };
