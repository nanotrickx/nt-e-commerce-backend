import { RazorpayOrder } from '@common/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import Razorpay from "razorpay";
import crypto from "crypto";

@Injectable()
export class RazorpayService {
  constructor(private configService: ConfigService) {}

  async createOrder(orderData: RazorpayOrder){
    let razorPayClient = new Razorpay({
        key_id: this.configService.get("RAZORPAY_KEY_ID"),
        key_secret: this.configService.get("RAZORPAY_KEY_SECRET"),
    });
    const orderResponse = await razorPayClient.orders.create(orderData);
    razorPayClient = undefined;
    return orderResponse;
  }

  signatureVerification(payload: any, signature: string){
    const secret = this.configService.get("RAZORPAY_WEBHOOK_SECRET");
	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(payload))
	const digest = shasum.digest('hex')
	console.log(digest, signature)
	if (digest === signature) {
		console.log('request is legit')
		// process it
		return true;
	} else {
		// invaild request
        return false;
	}
  }
  
}
