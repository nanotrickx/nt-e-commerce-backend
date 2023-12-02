import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { {{pascalCase name}}{{pascalCase singularName}}Mapper } from './{{dashCase name}}-mapper';
import { {{pascalCase name}}{{pascalCase singularName}}Request } from './{{dashCase name}}-request';
import { {{pascalCase singularName}}Service } from '@infra/db/{{dashCase singularName}}/{{dashCase singularName}}.service';

@ApiTags('{{dashCase pluralName}}')
@ApiBearerAuth()
@Controller('{{dashCase pluralName}}')
export class {{pascalCase name}}{{pascalCase singularName}}Controller {
  constructor(
    private readonly getListService: {{pascalCase singularName}}Service,
    private readonly mapper: {{pascalCase name}}{{pascalCase singularName}}Mapper
  ) {}

  @Get()
  @HttpCode(200)
  async execute(@Query() query: {{pascalCase name}}{{pascalCase singularName}}Request): Promise<any> {
    const result = await this.getListService.pagedAsync(
      query.pageNumber,
      query.pageSize,
      query.orderByPropertyName,
      query.sortingDirection
    );
    const response = this.mapper.mapTo{{pascalCase singularName}}Response(result);
    return response;
  }
}
