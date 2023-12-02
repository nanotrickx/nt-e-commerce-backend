import { Controller, Delete, HttpCode, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryService } from '@infra/db/category/category.service';

@ApiTags('categories')
@ApiBearerAuth()
@Controller('categories')
export class DeleteCategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) {}

  @Delete(':id')
  @HttpCode(204)
  async execute(@Param('id') id: string): Promise<void> {
    const result = this.categoryService.delete(id);
    return result;
  }
}
