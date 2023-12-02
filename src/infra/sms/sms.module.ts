import { Module } from '@nestjs/common';

import { SmsService } from './sms.service';
import { OtpCacheService } from './otp-cache.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [],
  providers: [SmsService, OtpCacheService],
  exports: [SmsService, OtpCacheService]
})
export class SmsModule {}
