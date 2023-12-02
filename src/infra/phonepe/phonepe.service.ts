import { Order } from '@infra/db/order/order.schema';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const sha256 = require('sha256');

@Injectable()
export class PhonepeService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService) {}

  async createCheckoutSession(amount: number, successUrl: string, cancelUrl: string, orderData: Order): Promise<any> {
    const failureQueryParam = `${cancelUrl}/?paymentStatus=failed&orderId=${orderData.id}`;
    const successQueryParam = `${successUrl}/?paymentStatus=processing&orderId=${orderData.id}`;
    const env = ["prod", "uat"];
    if(env.includes(this.configService.get("PHONEPE_ENV"))){
      let salt = ''; 
      let pgLink = '';
      let merchantId = '';
      let merchantUserId = '';
      if(this.configService.get("PHONEPE_ENV") == "prod"){
        salt = this.configService.get("PHONEPE_SALT");
        pgLink = this.configService.get("PHONEPE_URL");
        merchantId = this.configService.get("PHONEPE_MERCHANT_ID");
        merchantUserId = this.configService.get("PHONEPE_MERCHANT_USER_ID");
      }
      if(this.configService.get("PHONEPE_ENV") == "uat"){
        salt = this.configService.get("PHONEPE_SALT_UAT");
        pgLink = this.configService.get("PHONEPE_URL_UAT");
        merchantId = this.configService.get("PHONEPE_MERCHANT_ID_UAT");
        merchantUserId = this.configService.get("PHONEPE_MERCHANT_USER_ID_UAT");
      }
      console.log("amonut", amount);
      const rand = Math.floor(Math.random()*(999-100+1)+100);
      const payload = {
        "merchantId": merchantId,
        "merchantTransactionId": orderData.id+"_"+rand,
        "merchantUserId": merchantUserId,
        "amount": amount*100,
        "redirectUrl": successQueryParam,
        "redirectMode": "REDIRECT",
        "callbackUrl": this.configService.get("PHONEPE_WEBHOOK"),
        "mobileNumber": orderData.mobile?orderData.mobile:"",
        "paymentInstrument": {
          "type": "PAY_PAGE"
        }
      }
    
      var base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");
      // console.log("base64", base64Payload);
      const checksum = this.createChecksum(base64Payload);
      // console.log(checksum);
      const result =await this.createOrder(pgLink, {"request": base64Payload}, checksum);
      console.log(result);
      return result.data?.instrumentResponse?.redirectInfo?.url;
    }else{
      // invalid env mode
    }
    
  }

  createChecksum(base64payload): string {
    let salt = "";
    if(this.configService.get("PHONEPE_ENV") == "prod"){
      salt = this.configService.get("PHONEPE_SALT");
    }
    if(this.configService.get("PHONEPE_ENV") == "uat"){
      salt = this.configService.get("PHONEPE_SALT_UAT");
    }
    const hash = sha256(base64payload+'/pg/v1/pay'+salt);
    const checksum = hash+'###'+1;
    return checksum;
  }

  createCallbackChecksum(base64payload): string {
    let salt = "";
    if(this.configService.get("PHONEPE_ENV") == "prod"){
      salt = this.configService.get("PHONEPE_SALT");
    }
    if(this.configService.get("PHONEPE_ENV") == "uat"){
      salt = this.configService.get("PHONEPE_SALT_UAT");
    }
    const hash = sha256(base64payload+salt);
    const checksum = hash+'###'+1;
    return checksum;
  }

  createOrder(pgLink, payload, checksum): Promise<any> {
    return new Promise(async(resolve, reject)=> {
      try{
        const result =await this.httpService.post(pgLink, payload, {
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': checksum
          }
        }).toPromise();
        resolve(result.data);
      } catch(e){
        reject("phonepe payment intent failed")
        console.log("phonepe api error", e);
      }
      
    });
  }

  // public verify({ signingKey, timestamp, token, signature }) {
  //   const encodedToken = crypto
  //     .createHmac('sha256', signingKey)
  //     .update(timestamp.concat(token))
  //     .digest('hex')
  //   return (encodedToken === signature);
  // }
}
