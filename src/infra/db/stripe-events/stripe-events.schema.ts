import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type StripeEventsDocument = HydratedDocument<StripeEvents>;

@Schema({
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  }
})
export class StripeEvents {
  id: string;


// New Fields

  @Prop()
  type: string;

  @Prop({type: Object})
  data: Record<string, any>;

  @Prop()
  created_by: string;

  // @Prop()
  created_at: Date;

  @Prop()
  modified_by: string;

  // @Prop()
  modified_at: Date;
}

const StripeEventsSchema = SchemaFactory.createForClass(StripeEvents);

export { StripeEventsSchema };
