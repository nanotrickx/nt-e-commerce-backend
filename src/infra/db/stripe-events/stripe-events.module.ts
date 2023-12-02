import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StripeEvents, StripeEventsSchema } from './stripe-events.schema';
import { StripeEventsService } from './stripe-events.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: StripeEvents.name,
        useFactory: () => {
          const schema = StripeEventsSchema;
          schema.pre('save', function () {
            // console.log('Hello from pre save');
          });
          return schema;
        }
      }
    ])
  ],
  providers: [StripeEventsService],
  exports: [StripeEventsService]
})
export class StripeEventsModule {}
