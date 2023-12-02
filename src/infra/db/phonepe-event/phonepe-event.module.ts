import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhonepeEvent, PhonepeEventSchema } from './phonepe-event.schema';
import { PhonepeEventService } from './phonepe-event.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PhonepeEvent.name,
        useFactory: () => {
          const schema = PhonepeEventSchema;
          schema.pre('save', function () {
            // console.log('Hello from pre save');
          });
          return schema;
        }
      }
    ])
  ],
  providers: [PhonepeEventService],
  exports: [PhonepeEventService]
})
export class PhonepeEventModule {}
