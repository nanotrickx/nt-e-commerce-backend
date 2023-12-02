import { Body, Controller,HttpCode, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { {{pascalCase name}}{{pascalCase singularName}}Mapper } from './{{dashCase name}}-mapper';
import { {{pascalCase name}}{{pascalCase singularName}}Request } from './{{dashCase name}}-request';
import { {{pascalCase name}}{{pascalCase singularName}}Response } from './{{dashCase name}}-response';
import { {{pascalCase singularName}}Service } from '@infra/db/{{dashCase singularName}}/{{dashCase singularName}}.service';
import { UnitOfWorkService } from '@infra/db/unit-of-work.service';

@ApiTags('{{dashCase pluralName}}')
@ApiBearerAuth()
@Controller('{{dashCase pluralName}}')
export class {{pascalCase name}}{{pascalCase singularName}}Controller {
  constructor(
    private readonly {{pascalCase singularName}}Service: {{pascalCase singularName}}Service,
    private readonly mapper: {{pascalCase name}}{{pascalCase singularName}}Mapper,
    private readonly unitOfWorkService: UnitOfWorkService
  ) {}

  @Post()
  @HttpCode(201)
  async execute(@Body() body: {{pascalCase name}}{{pascalCase singularName}}Request): Promise<{{pascalCase name}}{{pascalCase singularName}}Response> {
    const response = await this.unitOfWorkService.withRetrySession(async (session: any) => {
      const {{pascalCase singularName}} = this.mapper.mapTo{{pascalCase name}}{{pascalCase singularName}}Request(body);
      const result= await this.{{pascalCase singularName}}Service.insert({{pascalCase singularName}}, session);
      if(result){
        const response = this.mapper.mapTo{{pascalCase name}}{{pascalCase singularName}}Response(result[0]);
        return response;
      }
    });
    return response;
  }
}
