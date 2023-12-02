import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Webhook, WebhookSchema } from './webhook.schema';
import { WebhookService } from './webhook.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Webhook.name,
        useFactory: () => {
          const schema = WebhookSchema;
          schema.pre('save', function () {
            // console.log('Hello from pre save');
          });
          return schema;
        }
      }
    ])
  ],
  providers: [WebhookService],
  exports: [WebhookService]
})
export class WebhookModule {}
