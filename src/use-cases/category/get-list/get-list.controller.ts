import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetListCategoryMapper } from './get-list-mapper';
import { GetListCategoryRequest } from './get-list-request';
import { CategoryService } from '@infra/db/category/category.service';
import { ConfigService } from '@nestjs/config';

@ApiTags('categories')
@ApiBearerAuth()
@Controller('categories')
export class GetListCategoryController {
  constructor(
    private readonly getListService: CategoryService,
    private readonly mapper: GetListCategoryMapper,
    private configService: ConfigService
  ) {}

  @Get()
  @HttpCode(200)
  async execute(@Query() query: GetListCategoryRequest): Promise<any> {
    const result = await this.getListService.pagedAsync(
      query.pageNumber,
      query.pageSize,
      query.orderByPropertyName,
      query.sortingDirection
    );
    if(result.items){
      for(let j=0; j<result.items.length; j++){
        if(result.items[j].imgSrc){
          result.items[j].imgUrl = `${this.configService.get('IMAGES_BASE_URL')}/${result.items[j].imgSrc}`;
        }
      }
    }
    const response = this.mapper.mapToCategoryResponse(result);
    return response;
  }
}
