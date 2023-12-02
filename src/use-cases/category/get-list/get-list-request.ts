import { ApiPropertyOptional } from '@nestjs/swagger';
import { PagingParams } from 'src/use-cases/paging-params';

export class GetListCategoryRequest extends PagingParams {
}
