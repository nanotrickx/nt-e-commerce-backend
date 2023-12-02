import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpCacheService {
  private readonly redisClient;
  mobileNo = {};

  // private readonly redisService: RedisService
  constructor() {
    // this.redisClient = this.redisService.getClient();
  }

  async storeOTP(mobileNum: string, otp: string, expirySeconds: number): Promise<void> {
    // return await this.redisClient.set(mobileNum, otp, 'EX', expirySeconds);
    this.mobileNo[mobileNum] = {
      "otp": otp,
      "expirySeconds": expirySeconds
    };
    return;
  }

  async getOTP(mobileNum: string): Promise<string> {
    // return await this.redisClient.get(mobileNum);
    return this.mobileNo[mobileNum].otp;
  }

  async removeOTP(mobileNum: string): Promise<void> {
    // await this.redisClient.del(mobileNum);
    delete this.mobileNo[mobileNum];
  }
}
