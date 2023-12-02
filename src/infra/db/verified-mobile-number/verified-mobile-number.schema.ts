import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type VerifiedMobileNumberDocument = HydratedDocument<VerifiedMobileNumber>;

@Schema({
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  }
})
export class VerifiedMobileNumber {
  id: string;


// New Fields
  @Prop()
  mobileNumber: string;

  @Prop()
  verifiedAt: number;

  // @Prop()
  created_at: Date;

  // @Prop()
  modified_at: Date;
}

const VerifiedMobileNumberSchema = SchemaFactory.createForClass(VerifiedMobileNumber);

export { VerifiedMobileNumberSchema };
