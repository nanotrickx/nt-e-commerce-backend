import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetListProductImageMapper } from './get-list-mapper';
import { GetListProductImageRequest } from './get-list-request';
import { ProductImageService } from '@infra/db/product-image/product-image.service';
import { ConfigService } from '@nestjs/config';

@ApiTags('product-images')
@ApiBearerAuth()
@Controller('product-images')
export class GetListProductImageController {
  constructor(
    private readonly getListService: ProductImageService,
    private readonly mapper: GetListProductImageMapper,
    private configService: ConfigService
  ) {}

  @Get()
  @HttpCode(200)
  async execute(@Query() query: GetListProductImageRequest): Promise<any> {
    const result = await this.getListService.pagedAsync(
      query.pageNumber,
      query.pageSize,
      query.orderByPropertyName,
      query.sortingDirection,
      { productId: query.productId }
    );
    if(result.items){
      for(let j=0; j<result.items.length; j++){
        if(result.items[j].src){
          result.items[j].s3path = result.items[j].src;
          result.items[j].src = `${this.configService.get('IMAGES_BASE_URL')}/${result.items[j].src}`;
        }
      }
    }
    const response = this.mapper.mapToProductImageResponse(result);
    return response;
  }
}
