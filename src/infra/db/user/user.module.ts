import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', function () {
            // console.log('Hello from pre save');
          });
          return schema;
        },
      },
    ]),
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
