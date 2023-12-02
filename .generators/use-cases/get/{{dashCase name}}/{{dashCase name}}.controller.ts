import { Controller, Get, HttpCode,Param, Query, BadRequestException, NotFoundException } from '@nestjs/common';
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

  @Get(':id')
  @HttpCode(200)
  async execute(@Param('id') id: string, @Query() query: {{pascalCase name}}{{pascalCase singularName}}Request): Promise<any> {
    try{
      const result = await this.{{singularName}}Service.findById(id);
      if(result){
        const response = this.mapper.mapTo{{pascalCase singularName}}Response(result);
        return response;
      }else{
        throw new NotFoundException("Record Not Found");
      }
      
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
