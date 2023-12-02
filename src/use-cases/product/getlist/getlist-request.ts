import { ApiPropertyOptional } from '@nestjs/swagger';
import { PagingParams } from 'src/use-cases/paging-params';

export class GetlistProductRequest extends PagingParams {
    @ApiPropertyOptional()
    product_type: string;
    @ApiPropertyOptional()
    status: string;
}
