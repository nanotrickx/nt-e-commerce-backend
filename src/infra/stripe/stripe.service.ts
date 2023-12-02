import { Order } from '@infra/db/order/order.schema';
import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  async createCheckoutSession(amount: number, successUrl: string, cancelUrl: string, orderData: Order): Promise<string> {
    const failureQueryParam = `/?paymentStatus=failed&orderId=${orderData.id}`;
    const successQueryParam = `/?paymentStatus=success&orderId=${orderData.id}`;
    const session = await this.stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Clothes',
            },
            unit_amount: amount*100,
          },
          quantity: 1,
        },
      ],
      client_reference_id: orderData.id,
      metadata: {
        mobile: orderData.email,
        orderId: orderData.id
      },
      mode: 'payment',
      payment_intent_data: {
        metadata: {
          mobile: orderData.email,
          orderId: orderData.id
        }
      },
      success_url: successUrl+successQueryParam,
      cancel_url: cancelUrl+failureQueryParam,
    });

    return session.url;
  }

  // public verify({ signingKey, timestamp, token, signature }) {
  //   const encodedToken = crypto
  //     .createHmac('sha256', signingKey)
  //     .update(timestamp.concat(token))
  //     .digest('hex')
  //   return (encodedToken === signature);
  // }
}
