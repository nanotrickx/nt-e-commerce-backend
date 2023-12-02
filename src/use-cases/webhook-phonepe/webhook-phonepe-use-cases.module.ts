import { Module } from '@nestjs/common';
import { MongoDbModule } from '@infra/db/mongo-db.module';
import { CreatePhonepeWebhookController } from './create/create.controller';
import { CreatePhonepeWebhookMapper } from './create/create-mapper';
import { PhonepeClientModule } from '@infra/phonepe/phonepe.module';
import { PhonepeEventModule } from '@infra/db/phonepe-event/phonepe-event.module';

@Module({
  imports: [
    MongoDbModule,
    PhonepeClientModule,
    PhonepeEventModule
  ],
  controllers: [
    CreatePhonepeWebhookController
  ],
  providers: [CreatePhonepeWebhookMapper]
})
export class WebhookPhonepeUseCasesModule {}
