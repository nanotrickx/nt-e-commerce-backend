import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true
})
export class User {
  id: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  providerId: string;

  @Prop()
  identityServerUserId: string;

  @Prop()
  email: string;

  @Prop()
  status: string;

  @Prop()
  accountId: string;

  @Prop()
  roles: string[];

  @Prop()
  createdBy: string;

  @Prop()
  createdAt: string;

  @Prop()
  modifiedBy: string;

  @Prop()
  updatedAt: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
