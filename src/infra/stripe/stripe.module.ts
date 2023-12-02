import { UserModule } from '@infra/db/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeModule } from 'nestjs-stripe';
import { StripeService } from './stripe.service';
const modules = [
  StripeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory:async (configService: ConfigService) => ({
      apiKey: configService.get('STRIPE_SECRET_KEY'),
      apiVersion: '2022-11-15',
    }),
  }),
  UserModule
];
const providers = [
  StripeService
];
@Module({
  imports: [...modules],
  providers: [...providers],
  exports: [...modules, ...providers]
})
export class StripeClientModule {}
