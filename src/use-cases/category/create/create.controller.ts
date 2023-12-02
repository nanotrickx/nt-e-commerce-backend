import { Body, Controller,HttpCode, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCategoryMapper } from './create-mapper';
import { CreateCategoryRequest } from './create-request';
import { CreateCategoryResponse } from './create-response';
import { CategoryService } from '@infra/db/category/category.service';
import { UnitOfWorkService } from '@infra/db/unit-of-work.service';

@ApiTags('categories')
@ApiBearerAuth()
@Controller('categories')
export class CreateCategoryController {
  constructor(
    private readonly CategoryService: CategoryService,
    private readonly mapper: CreateCategoryMapper,
    private readonly unitOfWorkService: UnitOfWorkService
  ) {}

  @Post()
  @HttpCode(201)
  async execute(@Body() body: CreateCategoryRequest): Promise<CreateCategoryResponse> {
    const response = await this.unitOfWorkService.withRetrySession(async (session: any) => {
      const Category = this.mapper.mapToCreateCategoryRequest(body);
      const result= await this.CategoryService.insert(Category, session);
      if(result){
        const response = this.mapper.mapToCreateCategoryResponse(result[0]);
        return response;
      }
    });
    return response;
  }
}
