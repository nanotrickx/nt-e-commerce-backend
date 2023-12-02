import { Body, Controller, HttpCode, Put, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateCategoryMapper } from './update-mapper';
import { UpdateCategoryRequest } from './update-request';
import { CategoryService } from '@infra/db/category/category.service';

@ApiTags('categories')
@ApiBearerAuth()
@Controller('categories')
export class UpdateCategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly mapper: UpdateCategoryMapper
  ) {}

  @Put(':id')
  @HttpCode(204)
  async execute(@Param('id') id: string, @Body() body: UpdateCategoryRequest): Promise<void> {
    const category = this.mapper.mapToUpdateCategoryRequest(body);
    const result = this.categoryService.updateById(id, category, null);
    return result;
  }
}
