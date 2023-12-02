import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type {{pascalCase name}}Document = HydratedDocument<{{pascalCase name}}>;

@Schema({
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  }
})
export class {{pascalCase name}} {
  id: string;


// New Fields

  @Prop()
  created_by: string;

  @Prop()
  created_at: Date;

  @Prop()
  modified_by: string;

  @Prop()
  modified_at: Date;
}

const {{pascalCase name}}Schema = SchemaFactory.createForClass({{pascalCase name}});

export { {{pascalCase name}}Schema };
