import { Body, Controller, HttpCode, Put, Param, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateOrderMapper } from './update-mapper';
import { UpdateOrderRequest } from './update-request';
import { OrderService } from '@infra/db/order/order.service';
import {Request} from 'express';
import { RazorpayService } from '@infra/razorpay/razorpay.service';
import { ConfigService } from '@nestjs/config';
import { StripeService } from '@infra/stripe/stripe.service';
import { UserService } from '@infra/db/user/user.service';
import { PhonepeService } from '@infra/phonepe/phonepe.service';

@ApiTags('orders')
@ApiBearerAuth()
@Controller(['orders', 'checkout'])
export class UpdateOrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly mapper: UpdateOrderMapper,
    private readonly razorpayService: RazorpayService,
    private configService: ConfigService,
    private stripeService: StripeService,
    private phonepeService: PhonepeService,
    private userService: UserService
  ) {}

  @Put(':id')
  @HttpCode(200)
  async execute(@Param('id') id: string, @Body() body: UpdateOrderRequest, @Req() req: Request): Promise<unknown> {
    // console.log("admin", req)
    const route = req.route.path.split("/");
    const order:any = this.mapper.mapToUpdateOrderRequest(body);
    const currentOrderVersion = await this.orderService.findById(id);
    if(route.includes("checkout")){
      const res = await this.orderService.checkout(order, id, currentOrderVersion);
      if(res == "done"){
        const updatedOrderVersion = await this.orderService.findById(id);
        let paymentAmount = updatedOrderVersion.total;
        if(updatedOrderVersion.paymentMode == "cod"){
          paymentAmount = updatedOrderVersion.shippingCost;
        }
        // payment gateway call
        
        if(this.configService.get("PAYMENT_GATEWAY") == "rayzorPay"){
          const paymentResponse =  await this.rayzorPay(paymentAmount, updatedOrderVersion);
          let finalResult = JSON.parse(JSON.stringify(updatedOrderVersion));
          finalResult.paymentInfo = {
            gateway: "razorpay",
            data: paymentResponse
          }
          return finalResult;
        } else if(this.configService.get("PAYMENT_GATEWAY") == "stripe"){
          const paymentResponse = await this.stripeService.createCheckoutSession(paymentAmount, this.configService.get("STRIP_SUCCESS_URL"),this.configService.get("STRIP_FAILURE_URL"), updatedOrderVersion);
          let finalResult = JSON.parse(JSON.stringify(updatedOrderVersion));
          finalResult.paymentInfo = {
            gateway: "stripe",
            data: paymentResponse
          }
          return finalResult;
        } else if(this.configService.get("PAYMENT_GATEWAY") == "phonepe"){
          const paymentResponse = await this.phonepeService.createCheckoutSession(paymentAmount, this.configService.get("STRIP_SUCCESS_URL"),this.configService.get("STRIP_FAILURE_URL"), updatedOrderVersion);
          let finalResult = JSON.parse(JSON.stringify(updatedOrderVersion));
          finalResult.paymentInfo = {
            gateway: "phonepe",
            data: paymentResponse
          }
          return finalResult;
        }
      }
      
    }else{
      if(req["user"] && req["user"].email){
        const user = await this.userService.findOne({filter: {email: req["user"].email}});
        if(user && user.roles && user.roles.length > 0){
          req["user"].roles = user.roles;
        }
      }
      
      if(order.productVariantList && order.productVariantList.length > 0){
        const subtotalUpdatedOrderData: any = await this.orderService.prepareOrderSubTotals(order);
        if(req["user"] && req["user"].roles && req["user"].roles.includes("admin")){
          if(order.orderStatus){
            if(subtotalUpdatedOrderData.data.orderStatus && Array.isArray(subtotalUpdatedOrderData.data.orderStatus)){
              subtotalUpdatedOrderData.data.orderStatus.push(
                {
                  status: order.status,
                  timestamp: Math.floor(new Date().getTime() / 1000)
                }
              )
            }else{
              subtotalUpdatedOrderData.data.orderStatus = [
                {
                  status: order.status,
                  timestamp: Math.floor(new Date().getTime() / 1000)
                }
              ]
            }
          }
          
          if(order.paymentTransactions){
            if(subtotalUpdatedOrderData.data.paymentTransactions && Array.isArray(subtotalUpdatedOrderData.data.paymentTransactions)){
              subtotalUpdatedOrderData.data.paymentTransactions.push(order.paymentTransactions)
            }else{
              subtotalUpdatedOrderData.data.paymentTransactions = [order.paymentTransactions];
            }
          }
        }else{
          delete subtotalUpdatedOrderData.data.status;
          delete subtotalUpdatedOrderData.data.paymentTransactions;
          
        }
        await this.orderService.updateById(id, subtotalUpdatedOrderData.data, null);
        const updatedOrderVersion = await this.orderService.findById(id);
        return updatedOrderVersion;
      }else{
        if(req["user"] && req["user"].roles && req["user"].roles.includes("admin")){
          if(order.orderStatus){
            if(currentOrderVersion.orderStatus && Array.isArray(currentOrderVersion.orderStatus)){
              currentOrderVersion.orderStatus.push(
                {
                  status: order.status,
                  timestamp: Math.floor(new Date().getTime() / 1000)
                }
              )
            }else{
              currentOrderVersion.orderStatus = [
                {
                  status: order.status,
                  timestamp: Math.floor(new Date().getTime() / 1000)
                }
              ]
            }
            
          }
          order.orderStatus = currentOrderVersion.orderStatus;
          
          if(order.paymentTransactions){
            if(currentOrderVersion.paymentTransactions && Array.isArray(currentOrderVersion.paymentTransactions)){
              currentOrderVersion.paymentTransactions.push(order.paymentTransactions)
            }else{
              currentOrderVersion.paymentTransactions = [order.paymentTransactions];
            }
          }
          order.paymentTransactions = currentOrderVersion.paymentTransactions;
        }else{
          delete order.status;
          delete order.paymentTransactions;
          
        }
        await this.orderService.updateById(id, order, null);
        const updatedOrderVersion = await this.orderService.findById(id);
        return updatedOrderVersion;
      }
    }
  }

  async rayzorPay(paymentAmount: number, updatedOrderVersion: any){
    const paymentResponse = await this.razorpayService.createOrder({
      amount: paymentAmount*100,
      currency: updatedOrderVersion.currencyCode,
      receipt: updatedOrderVersion.id,
      partial_payment: false,
      notes: {
        total: updatedOrderVersion.total.toString(),
        id: updatedOrderVersion.id
      }
    })
    console.log(paymentResponse);
    return paymentResponse;
  }
}
