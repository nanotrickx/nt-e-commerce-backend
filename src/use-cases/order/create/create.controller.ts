import { BadRequestException, Body, Controller,HttpCode, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateOrderMapper } from './create-mapper';
import { CreateOrderRequest } from './create-request';
import { CreateOrderResponse } from './create-response';
import { OrderService } from '@infra/db/order/order.service';
import { UnitOfWorkService } from '@infra/db/unit-of-work.service';
import { UserService } from '@infra/db/user/user.service';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class CreateOrderController {
  constructor(
    private readonly OrderService: OrderService,
    private userService: UserService,
    private readonly mapper: CreateOrderMapper
  ) {}

  @Post()
  @HttpCode(201)
  async execute(@Body() body: CreateOrderRequest, @Req() req): Promise<CreateOrderResponse> {
    try {
      const Order = this.mapper.mapToCreateOrderRequest(body);
      const subtotalUpdatedOrderData:any = await this.OrderService.prepareOrderSubTotals(Order);
      // console.log(JSON.stringify(subtotalUpdatedOrderData));
      if(subtotalUpdatedOrderData.status == true){
        if(req["user"] && req["user"].email){
          const user = await this.userService.findOne({filter: { email: req["user"].email}});
          subtotalUpdatedOrderData.data.accountId = user.id;
        }
        subtotalUpdatedOrderData.data.orderStatus = [{
          status: "Draft",
          timestamp: Math.floor(new Date().getTime() / 1000)
        }]
        const result= await this.OrderService.insert(subtotalUpdatedOrderData.data, null);
        if(result){
          const response = this.mapper.mapToCreateOrderResponse(result[0]);
          return response;
        }
      }else{
        delete subtotalUpdatedOrderData.status;
        throw new BadRequestException(subtotalUpdatedOrderData);
      }
    } catch (error) {
      // if(typeof error !== 'string'){
      //   error = JSON.stringify(error);
      // }
      throw new BadRequestException(error);
    }
  }
}
