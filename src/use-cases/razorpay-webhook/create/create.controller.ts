import { Body, Controller,HttpCode, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateWebhookRequest } from './create-request';
import { CreateWebhookResponse } from './create-response';
import { WebhookService } from '@infra/db/webhook/webhook.service';
import { Webhook } from '@infra/db/webhook/webhook.schema';
import { RazorpayService } from '@infra/razorpay/razorpay.service';
import { Request } from 'express';

@ApiTags('webhooks')
@ApiBearerAuth()
@Controller('webhooks')
export class CreateWebhookController {
  constructor(
    private readonly WebhookService: WebhookService,
    private razorpayService: RazorpayService
  ) {}

  @Post()
  @HttpCode(200)
  async execute(@Body() body: CreateWebhookRequest, @Req() request): Promise<CreateWebhookResponse> {
    console.log("signature", request.headers['x-razorpay-signature']);
    if(this.razorpayService.signatureVerification(request.rawBody, request.headers['x-razorpay-signature'])){
      const webhook: Partial<Webhook> = {
        providerName: "razorpay",
        eventData: body,
        timestamp: new Date().getTime()
      }
      const result= await this.WebhookService.insert(webhook, null);
      return { message: "done" };
    }else{
      return { message: "unauthorized"};
    }
    
  }
}
