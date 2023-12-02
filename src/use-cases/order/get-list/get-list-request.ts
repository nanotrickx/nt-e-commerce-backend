import { OrderStatus } from '@common/order';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PagingParams } from 'src/use-cases/paging-params';

export class GetListOrderRequest extends PagingParams {
    @ApiPropertyOptional()
    status: OrderStatus
}
