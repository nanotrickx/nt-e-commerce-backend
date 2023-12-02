import { Controller, Get, HttpCode,Param, Query, BadRequestException, NotFoundException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetProductImageMapper } from './get-mapper';
import { GetProductImageRequest } from './get-request';
import { ProductImageService } from '@infra/db/product-image/product-image.service';
import { ConfigService } from '@nestjs/config';

@ApiTags('product-images')
@ApiBearerAuth()
@Controller('product-images')
export class GetProductImageController {
  constructor(
    private readonly productImageService: ProductImageService,
    private readonly mapper: GetProductImageMapper,
    private configService: ConfigService
  ) {}

  @Get(':id')
  @HttpCode(200)
  async execute(@Param('id') id: string, @Query() query: GetProductImageRequest): Promise<any> {
    try{
      const result = await this.productImageService.findById(id);
      if(result){
        const response:any = this.mapper.mapToProductImageResponse(result);
        if(response.src){
          response.src = `${this.configService.get('IMAGES_BASE_URL')}/${response.src}`
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
