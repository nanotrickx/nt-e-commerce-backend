import { Module } from '@nestjs/common';
import { MongoDbModule } from '@infra/db/mongo-db.module';
import { CreateWebhookController } from './create/create.controller';
import { RazerpayModule } from '@infra/razorpay/razorpay.module';

@Module({
  imports: [
    MongoDbModule,
    RazerpayModule
  ],
  controllers: [
    CreateWebhookController
  ],
  providers: []
})
export class WebhookUseCasesModule {}
