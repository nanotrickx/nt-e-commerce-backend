import { ProductImageType } from '@common/image';
import { ProductOptions } from '@common/product-options';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, Types } from 'mongoose';
import { ProductImage } from '../product-image/product-image.schema';
import { ProductVariant } from '../product-variant/product-variant.schema';

export type ProductDocument = HydratedDocument<Product>;

export enum ProductStatusEnum {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
  DRAFT = "DRAFT"
}

@Schema({
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  },
})
export class Product {
  id: string;

  @Prop()
  title: string;

  @Prop()
  slug: string;

  @Prop()
  description: string;

  @Prop()
  body: string;

  @Prop()
  vendor: string;

  @Prop()
  product_type: string;

  @Prop()
  published_at: string;

  @Prop()
  published_scope: string;

  @Prop()
  tags: string;

  @Prop({type: ProductOptions})
  options: Record<string, string | Array<string>>;

  @Prop({type: ProductImageType})
  image: Record<string, string>;

  // @Prop({type: [Types.ObjectId], ref: ProductImage.name})
  images: ProductImage[]

  variants: ProductVariant[]

  @Prop({enum: ProductStatusEnum})
  status: string;

  @Prop()
  created_by: string;

  created_at: Date;

  @Prop()
  modified_by: string;

  updated_at: Date;
}

const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.virtual('images', {
  ref: 'ProductImage',
  localField: '_id',
  foreignField: 'product_id',
});
ProductSchema.virtual('variants', {
  ref: 'ProductVariant',
  localField: '_id',
  foreignField: 'product_id',
});

export { ProductSchema };
