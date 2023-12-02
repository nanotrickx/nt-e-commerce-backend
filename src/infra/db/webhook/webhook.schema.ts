import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type WebhookDocument = HydratedDocument<Webhook>;

@Schema({
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  }
})
export class Webhook {
  id: string;

  @Prop()
  providerName: string;

  @Prop({type: Object})
  eventData: Record<string,any>;

  @Prop()
  timestamp: number;

  @Prop()
  created_by: string;

  created_at: Date;

  @Prop()
  modified_by: string;

  modified_at: Date;
}

const WebhookSchema = SchemaFactory.createForClass(Webhook);

export { WebhookSchema };
