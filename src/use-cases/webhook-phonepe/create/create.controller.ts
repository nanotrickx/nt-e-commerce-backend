import { BadRequestException, Body, Controller,HttpCode, InternalServerErrorException, Param, Post, Req, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@infra/db/user/user.service';
import { OrderService } from '@infra/db/order/order.service';
import { PhonepeService } from '@infra/phonepe/phonepe.service';
import { PhonepeEventService } from '@infra/db/phonepe-event/phonepe-event.service';

interface webhookDTO{
  providername: string;
  version: string;
}

@ApiTags('webhook')
@Controller('webhook-phonepe')
export class CreatePhonepeWebhookController {
  constructor(
    private configService: ConfigService,
    private orderService: OrderService,
    private phonepeService: PhonepeService,
    private phonepeEventService: PhonepeEventService
  ) {}

  @Post()
  @HttpCode(200)
  async execute(@Body() body: any, @Req() request): Promise<any> {
    // console.log("payment trigger", request)
    const sig = request.headers['x-verify'];
    console.log("checksum header", sig);
    if(sig == undefined){
      throw new BadRequestException("Invaild Request");
    }

    try {
      const calculatedChecksum = this.phonepeService.createCallbackChecksum(body.response);
      console.log("req body", body);
      console.log("cal checksum", calculatedChecksum);
      if(calculatedChecksum === sig){
        const responseString = Buffer.from(body.response, 'base64').toString();
        const response = JSON.parse(responseString);
        this.phonepeEventService.insert({type: response.code, data: response}, null);
        // console.log(response);
        switch (response.code) {
          case 'PAYMENT_SUCCESS':
            if(response && response.data && response.data.transactionId){
              let orderId = response.data.merchantTransactionId.split("_")[0];
              this.orderService.addPayment(orderId,
                response.data.transactionId,
                "onlinePay",
                "phonepe",
                response.data.amount / 100,
                Math.floor(new Date().getTime() / 1000),
                response.data.state?response.data.state:"none")
            }
            // console.log(chargeCaptured);
            // Then define and call a function to handle the event charge.captured
            break;
          case 'PAYMENT_ERROR':
            if(response && response.data && response.data.transactionId){
              this.orderService.addPayment(response.data.merchantTransactionId,
                response.data.transactionId,
                "onlinePay",
                "phonepe",
                response.data.amount / 100,
                Math.floor(new Date().getTime() / 1000),
                "captured")
            }
            // console.log(chargeCaptured);
            // Then define and call a function to handle the event charge.failed
            break;
          default:
            console.log(`Unhandled event type ${event.type}`);
        }
      }else{
        throw new UnauthorizedException("Unauthorized");
      }
      
    } catch (err) {
      throw new BadRequestException(`Webhook Error: ${err.message}`)
    }
      
  }
}
