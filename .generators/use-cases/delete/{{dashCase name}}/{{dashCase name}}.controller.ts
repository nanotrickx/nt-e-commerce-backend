import { Controller, Delete, HttpCode, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { {{pascalCase singularName}}Service } from '@infra/db/{{dashCase singularName}}/{{dashCase singularName}}.service';

@ApiTags('{{dashCase pluralName}}')
@ApiBearerAuth()
@Controller('{{dashCase pluralName}}')
export class {{pascalCase name}}{{pascalCase singularName}}Controller {
  constructor(
    private readonly {{singularName}}Service: {{pascalCase singularName}}Service,
  ) {}

  @Delete(':id')
  @HttpCode(204)
  async execute(@Param('id') id: string): Promise<void> {
    const result = null;
  }
}
