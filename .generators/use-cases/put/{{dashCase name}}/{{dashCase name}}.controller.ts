import { Body, Controller, HttpCode, Put, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { {{pascalCase name}}{{pascalCase singularName}}Mapper } from './{{dashCase name}}-mapper';
import { {{pascalCase name}}{{pascalCase singularName}}Request } from './{{dashCase name}}-request';
import { {{pascalCase singularName}}Service } from '@infra/db/{{dashCase singularName}}/{{dashCase singularName}}.service';

@ApiTags('{{dashCase pluralName}}')
@ApiBearerAuth()
@Controller('{{dashCase pluralName}}')
export class {{pascalCase name}}{{pascalCase singularName}}Controller {
  constructor(
    private readonly {{singularName}}Service: {{pascalCase singularName}}Service,
    private readonly mapper: {{pascalCase name}}{{pascalCase singularName}}Mapper
  ) {}

  @Put(':id')
  @HttpCode(204)
  async execute(@Param('id') id: string, @Body() body: {{pascalCase name}}{{pascalCase singularName}}Request): Promise<void> {
    const result = null;
  }
}
