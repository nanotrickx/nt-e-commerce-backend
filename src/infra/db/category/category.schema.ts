import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  }
})
export class Category {
  id: string;

  @Prop()
  title: string;

  @Prop()
  slug: string;

  @Prop()
  description: string;

  @Prop()
  imgSrc: string;

  @Prop()
  isMenu: boolean;

  @Prop()
  status: string;

  @Prop()
  created_by: string;

  created_at: Date;

  @Prop()
  modified_by: string;

  modified_at: Date;
}

const CategorySchema = SchemaFactory.createForClass(Category);

export { CategorySchema };
