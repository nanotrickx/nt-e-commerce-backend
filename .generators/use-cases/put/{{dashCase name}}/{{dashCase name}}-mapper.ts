import { {{pascalCase singularName}} } from '@infra/db/{{dashCase singularName}}/{{dashCase singularName}}.schema';
import { {{pascalCase name}}{{pascalCase singularName}}Request } from './{{dashCase name}}-request';
import { {{pascalCase name}}{{pascalCase singularName}}Response } from './{{dashCase name}}-response';

export class {{pascalCase name}}{{pascalCase singularName}}Mapper {
  public mapTo{{pascalCase name}}{{pascalCase singularName}}Request(source: {{pascalCase name}}{{pascalCase singularName}}Request): Partial<{{pascalCase singularName}}>{
    const response: Partial<{{pascalCase singularName}}> = {
      
    };
    return response;
  }

  public mapTo{{pascalCase name}}{{pascalCase singularName}}Response(source: {{pascalCase singularName}}): {{pascalCase name}}{{pascalCase singularName}}Response {
    const response: {{pascalCase name}}{{pascalCase singularName}}Response = {
      
    };
    return response;
  }
}
