import { Module } from '@nestjs/common';
import { SendOtpOtpController } from './send-otp/send-otp.controller';
import { SendOtpMapper } from './send-otp/send-otp-mapper';
import { SmsModule } from '@infra/sms/sms.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { VerifiedMobileNumberModule } from '@infra/db/verified-mobile-number/verified-mobile-number.module';

@Module({
  imports: [
    SmsModule,
    VerifiedMobileNumberModule
  ],
  controllers: [
    SendOtpOtpController
  ],
  providers: [SendOtpMapper]
})
export class OtpUseCasesModule {}
