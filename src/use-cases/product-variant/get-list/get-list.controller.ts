import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetListProductVariantMapper } from './get-list-mapper';
import { GetListProductVariantRequest } from './get-list-request';
import { ProductVariantService } from '@infra/db/product-variant/product-variant.service';

@ApiTags('product-variants')
@ApiBearerAuth()
@Controller('product-variants')
export class GetListProductVariantController {
  constructor(
    private readonly getListService: ProductVariantService,
    private readonly mapper: GetListProductVariantMapper
  ) {}

  @Get()
  @HttpCode(200)
  async execute(@Query() query: GetListProductVariantRequest): Promise<any> {
    const result = await this.getListService.pagedAsync(
      query.pageNumber,
      query.pageSize,
      query.orderByPropertyName,
      query.sortingDirection
    );
    const response = this.mapper.mapToProductVariantResponse(result);
    return response;
  }
}
