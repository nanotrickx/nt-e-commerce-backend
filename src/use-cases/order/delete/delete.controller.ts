import { Controller, Delete, HttpCode, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from '@infra/db/order/order.service';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class DeleteOrderController {
  constructor(
    private readonly orderService: OrderService,
  ) {}

  @Delete(':id')
  @HttpCode(204)
  async execute(@Param('id') id: string): Promise<void> {
    const result = null;
  }
}
