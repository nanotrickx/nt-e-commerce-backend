import { Injectable, InternalServerErrorException, Scope } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { OtpCacheService } from './otp-cache.service';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class SmsService {
  constructor(private configService: ConfigService,
    private readonly otpCacheService: OtpCacheService,
    private readonly httpService: HttpService) {}

  async sendSms(mobileNumber: string): Promise<any> {
    try {
      const storedOTP = await this.otpCacheService.getOTP(mobileNumber);
      if(storedOTP == null){
        const otp = this.generateOTP(6) // Generate OTP here
        const redisRes = await this.otpCacheService.storeOTP(mobileNumber, otp, this.configService.get("SMS_PREVENTION_SEC"));
        const smsres = await this.sendSMS(mobileNumber, otp);
        return redisRes;
      }else{
        return "OTP Already Sented."
      }
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async verify(mobileNumber: string, otp){
    const storedOTP = await this.otpCacheService.getOTP(mobileNumber);
    if (storedOTP && storedOTP === otp) {
      // OTP is valid
      await this.otpCacheService.removeOTP(mobileNumber);
      return true;
    }else{
      // OTP is invalid
      return false;
    }
    
  }

  generateOTP(length) {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }

  async sendSMS(mobileNumber: string, OTP: string | number): Promise<any>{
    const apiKey = this.configService.get("SMS_API_KEY");
    const ClientId = this.configService.get("SMS_CLIENT_ID");
    const senderId = this.configService.get("SMS_SENDER_ID");
    const message = this.configService.get("SMS_OTP_TEMPLATE").replace("{{otp}}", OTP);
    const url = `https://sms.nettyfish.com/api/v2/SendSMS?ApiKey=${apiKey}&ClientId=${ClientId}&SenderId=${senderId}&Message=${message}&MobileNumbers=${mobileNumber}&Is_Unicode=false&Is_Flash=false`;
    // console.log(url)
    return this.httpService.get(url).subscribe();
  }
}
