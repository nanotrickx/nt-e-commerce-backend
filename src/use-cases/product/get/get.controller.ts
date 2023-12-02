import { Controller, Get, HttpCode,Param, Query, BadRequestException, NotFoundException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetProductMapper } from './get-mapper';
import { GetProductRequest } from './get-request';
import { ProductService } from '@infra/db/product/product.service';
import { ConfigService } from '@nestjs/config';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class GetProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly mapper: GetProductMapper,
    private configService: ConfigService
  ) {}

  @Get(':id')
  @HttpCode(200)
  async execute(@Param('id') id: string, @Query() query: GetProductRequest): Promise<any> {
    try{
      const result = await this.productService.findById(id);
      if(result){
        const response = this.mapper.mapToProductResponse(result);
        if(response && response.images){
          for(let i=0;i<response.images.length; i++){
            if(response.images[i].src){
              response.images[i].src = `${this.configService.get('IMAGES_BASE_URL')}/${response.images[i].src}`
            }
          }
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
