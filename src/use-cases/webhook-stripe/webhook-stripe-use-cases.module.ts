import { Module } from '@nestjs/common';
import { MongoDbModule } from '@infra/db/mongo-db.module';
import { CreateStripeWebhookController } from './create/create.controller';
import { CreateStripeWebhookMapper } from './create/create-mapper';
import Stripe from 'stripe';
import { StripeModule, stripeToken } from 'nestjs-stripe';
import { StripeClientModule } from '@infra/stripe/stripe.module';

@Module({
  imports: [
    MongoDbModule,
    Stripe,
    StripeModule,
    StripeClientModule
  ],
  controllers: [
    CreateStripeWebhookController
  ],
  providers: [CreateStripeWebhookMapper]
})
export class WebhookStripUseCasesModule {}
