import { Controller, Get, HttpCode,Param, Query, BadRequestException, NotFoundException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCategoryMapper } from './get-mapper';
import { GetCategoryRequest } from './get-request';
import { CategoryService } from '@infra/db/category/category.service';
import { ConfigService } from '@nestjs/config';

@ApiTags('categories')
@ApiBearerAuth()
@Controller('categories')
export class GetCategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly mapper: GetCategoryMapper,
    private configService: ConfigService
  ) {}

  @Get(':id')
  @HttpCode(200)
  async execute(@Param('id') id: string, @Query() query: GetCategoryRequest): Promise<any> {
    try{
      const result = await this.categoryService.findById(id);
      if(result){
        const response:any = this.mapper.mapToCategoryResponse(result);
        if(response.imgSrc){
          response.imgUrl = `${this.configService.get('IMAGES_BASE_URL')}/${response.imgSrc}`
        }
        return response;
      }else{
        throw new NotFoundException("Record Not Found");
      }
      
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
