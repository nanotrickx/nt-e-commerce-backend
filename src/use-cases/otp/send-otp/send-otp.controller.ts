import { Body, Controller,HttpCode, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SendOtpMapper } from './send-otp-mapper';
import { SendOtpOtpRequest, VerifyOtpRequest } from './send-otp-request';
import { SendOtpOtpResponse } from './send-otp-response';
import { SmsService } from '@infra/sms/sms.service';
import { VerifiedMobileNumberService } from '@infra/db/verified-mobile-number/verified-mobile-number.service';
import { VerifiedMobileNumber } from '@infra/db/verified-mobile-number/verified-mobile-number.schema';

@ApiTags('otps')
@ApiBearerAuth()
@Controller('otp')
export class SendOtpOtpController {
  constructor(
    private readonly mapper: SendOtpMapper,
    private readonly smsService: SmsService,
    private readonly verifiedMobileNumberService: VerifiedMobileNumberService
  ) {}

  @Post()
  @HttpCode(200)
  async execute(@Body() body: SendOtpOtpRequest): Promise<SendOtpOtpResponse> {
    const Otp = this.mapper.mapToSendOtpOtpRequest(body);
    // const isVerified = await this.verifiedMobileNumberService.isVerifiedMobileNumber(body.mobileNo, 24);
    const isVerified = false;
    if(!isVerified){
      const result = await this.smsService.sendSms(body.mobileNo);
      let resObj = { status: true, statusCode: 201, message: "OTP Sent" };
      return resObj;
    }else{
      let resObj = { status: true, statusCode: 200, message: "verified" };
      return resObj;
    }
  }

  @Post("verify")
  @HttpCode(201)
  async verify(@Body() body: VerifyOtpRequest): Promise<SendOtpOtpResponse> {
    const Otp = this.mapper.mapToVerifyOtpOtpRequest(body);
    const result = await this.smsService.verify(body.mobileNo, body.otp);
      
    let resObj = { status: false, message: "invalid OTP" };
    if(result){
      let data: Partial<VerifiedMobileNumber>= {
        mobileNumber: body.mobileNo,
        verifiedAt: new Date().getTime()
      }
      await this.verifiedMobileNumberService.insert(data, null);
      resObj = { status: true, message: "verified" };
    }
    return resObj;
  }
}
