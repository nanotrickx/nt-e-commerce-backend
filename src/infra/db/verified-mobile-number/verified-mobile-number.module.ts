import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VerifiedMobileNumber, VerifiedMobileNumberSchema } from './verified-mobile-number.schema';
import { VerifiedMobileNumberService } from './verified-mobile-number.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: VerifiedMobileNumber.name,
        useFactory: () => {
          const schema = VerifiedMobileNumberSchema;
          schema.pre('save', function () {
            // console.log('Hello from pre save');
          });
          return schema;
        }
      }
    ])
  ],
  providers: [VerifiedMobileNumberService],
  exports: [VerifiedMobileNumberService]
})
export class VerifiedMobileNumberModule {}
