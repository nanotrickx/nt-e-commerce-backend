import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetlistProductMapper } from './getlist-mapper';
import { GetlistProductRequest } from './getlist-request';
import { ProductService } from '@infra/db/product/product.service';
import { ConfigService } from '@nestjs/config';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class GetlistProductController {
  constructor(
    private readonly getListService: ProductService,
    private readonly mapper: GetlistProductMapper,
    private configService: ConfigService
  ) {}

  @Get()
  @HttpCode(200)
  async execute(@Query() query: GetlistProductRequest): Promise<any> {
    const result = await this.getListService.pagedAsync(
      query.pageNumber,
      query.pageSize,
      query.orderByPropertyName,
      query.sortingDirection,
      { product_type: query.product_type, status: query.status }
    );
    if(result.items){
      for(let j=0; j<result.items.length; j++){
        if(result.items[j].images){
          for(let i=0;i<result.items[j].images.length; i++){
            result.items[j].images[i].src = `${this.configService.get('IMAGES_BASE_URL')}/${result.items[j].images[i].src}`
          }
        }
      }
    }
    const response = this.mapper.mapToProductResponse(result);
    
    return response;
  }
}
