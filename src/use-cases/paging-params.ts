import { ApiPropertyOptional } from '@nestjs/swagger';
import { SortingDirection } from '@common/sorting-direction';

export class PagingParams {
  @ApiPropertyOptional()
  pageNumber: number;
  @ApiPropertyOptional()
  pageSize: number;
  @ApiPropertyOptional()
  sortingDirection: SortingDirection;
  @ApiPropertyOptional()
  orderByPropertyName: string;
}
