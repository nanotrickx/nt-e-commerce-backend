import { Controller, Get, HttpCode,Param, Query, BadRequestException, NotFoundException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetOrderMapper } from './get-mapper';
import { GetOrderRequest } from './get-request';
import { OrderService } from '@infra/db/order/order.service';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class GetOrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly mapper: GetOrderMapper
  ) {}

  @Get(':id')
  @HttpCode(200)
  async execute(@Param('id') id: string, @Query() query: GetOrderRequest): Promise<any> {
    try{
      const result = await this.orderService.findById(id);
      if(result){
        const response = this.mapper.mapToOrderResponse(result);
        return response;
      }else{
        throw new NotFoundException("Record Not Found");
      }
      
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
