import { BadRequestException, Body, Controller,HttpCode, InternalServerErrorException, Param, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { InjectStripe } from 'nestjs-stripe';
import { StripeEventsService } from '@infra/db/stripe-events/stripe-events.service';
import { UserService } from '@infra/db/user/user.service';
import { OrderService } from '@infra/db/order/order.service';

interface webhookDTO{
  providername: string;
  version: string;
}

@ApiTags('webhook')
@Controller('webhook-stripe')
export class CreateStripeWebhookController {
  constructor(
    private configService: ConfigService,
    @InjectStripe() private readonly stripeClient: Stripe,
    private stripeEventsService: StripeEventsService,
    private userService: UserService,
    private orderService: OrderService
  ) {}

  @Post()
  @HttpCode(200)
  async execute(@Body() body: any, @Req() request): Promise<any> {
    const sig = request.headers['stripe-signature'];
    
    let event;

    try {
      event = this.stripeClient.webhooks.constructEvent(request.rawBody, sig, this.configService.get("STRIPE_WEBHOOK_ENDPOINT_SECRET"));
      // Handle the event
      console.log("event data", event.type)
      this.stripeEventsService.insert(event, null);
      switch (event.type) {
        case 'charge.captured':
          const chargeCaptured = event.data.object;
          if(chargeCaptured && chargeCaptured.metadata && chargeCaptured.metadata.orderId){
            this.orderService.addPayment(chargeCaptured.metadata.orderId,
              event.data.object.id,
              "onlinePay",
              "stripe",
              event.data.object.amount_captured / 100,
              Math.floor(new Date().getTime() / 1000),
              "captured")
          }
          // console.log(chargeCaptured);
          // Then define and call a function to handle the event charge.captured
          break;
        case 'charge.failed':
          const chargeFailed = event.data.object;
          if(chargeFailed && chargeFailed.metadata && chargeFailed.metadata.orderId){
            this.orderService.addPayment(chargeFailed.metadata.orderId,
              event.data.object.id,
              "onlinePay",
              "stripe",
              event.data.object.amount / 100,
              Math.floor(new Date().getTime() / 1000),
              "failed")
          }
          // console.log(chargeCaptured);
          // Then define and call a function to handle the event charge.failed
          break;
        case 'charge.pending':
          const chargePending = event.data.object;
          if(chargePending && chargePending.metadata && chargePending.metadata.orderId){
            this.orderService.addPayment(chargePending.metadata.orderId,
              event.data.object.id,
              "onlinePay",
              "stripe",
              event.data.object.amount / 100,
              Math.floor(new Date().getTime() / 1000),
              "pending")
          }
          // Then define and call a function to handle the event charge.pending
          break;
        case 'charge.succeeded':
          const chargeSucceeded = event.data.object;
          // Then define and call a function to handle the event charge.succeeded
          if(chargeSucceeded && chargeSucceeded.metadata && chargeSucceeded.metadata.orderId){
            this.orderService.addPayment(chargeSucceeded.metadata.orderId,
              event.data.object.id,
              "onlinePay",
              "stripe",
              event.data.object.amount_captured / 100,
              Math.floor(new Date().getTime() / 1000),
              "paid")
          }
          break;
        case 'checkout.session.async_payment_failed':
          const checkoutSessionAsyncPaymentFailed = event.data.object;
          if(checkoutSessionAsyncPaymentFailed && checkoutSessionAsyncPaymentFailed.metadata && checkoutSessionAsyncPaymentFailed.metadata.orderId){
            this.orderService.addPayment(checkoutSessionAsyncPaymentFailed.metadata.orderId,
              event.data.object.id,
              "onlinePay",
              "stripe",
              event.data.object.amount / 100,
              Math.floor(new Date().getTime() / 1000),
              "failed")
          }
          // Then define and call a function to handle the event checkout.session.async_payment_failed
          break;
        case 'checkout.session.async_payment_succeeded':
          const checkoutSessionAsyncPaymentSucceeded = event.data.object;
          if(checkoutSessionAsyncPaymentSucceeded && checkoutSessionAsyncPaymentSucceeded.metadata && checkoutSessionAsyncPaymentSucceeded.metadata.orderId){
            this.orderService.addPayment(checkoutSessionAsyncPaymentSucceeded.metadata.orderId,
              event.data.object.id,
              "onlinePay",
              "stripe",
              event.data.object.amount_captured / 100,
              Math.floor(new Date().getTime() / 1000),
              "paid")
          }
          // Then define and call a function to handle the event checkout.session.async_payment_succeeded
          break;
        case 'checkout.session.completed':
          const checkoutSessionCompleted = event.data.object;
          // Here we need to activate user plain
          // if(checkoutSessionCompleted && checkoutSessionCompleted.metadata && checkoutSessionCompleted.metadata.orderId){
          //   this.orderService.addPayment(checkoutSessionCompleted.metadata.orderId,
          //     event.data.object.id,
          //     "onlinePay",
          //     "stripe",
          //     event.data.object.amount_captured,
          //     Math.floor(new Date().getTime() / 1000),
          //     "paid")
          // }
          break;
        case 'price.created':
          
          break;
        case 'price.deleted':
          
          break;
        case 'price.updated':
          
          break;
        case 'product.created':
          
          break;
        case 'product.deleted':
          
          break;
        case 'product.updated':
          
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (err) {
      throw new BadRequestException(`Webhook Error: ${err.message}`)
    }
      
  }
}
