import { ApiPropertyOptional } from '@nestjs/swagger';
import { PagingParams } from 'src/use-cases/paging-params';

export class GetListProductImageRequest extends PagingParams {
    @ApiPropertyOptional()
    productId: string;
}
