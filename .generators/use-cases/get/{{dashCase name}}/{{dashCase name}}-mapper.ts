import { {{pascalCase singularName}} } from '@infra/db/{{dashCase singularName}}/{{dashCase singularName}}.schema';
import { PagedModel } from '@infra/db/helper';
import { {{pascalCase name}}{{pascalCase singularName}}Response } from './{{dashCase name}}-response';

export class {{pascalCase name}}{{pascalCase singularName}}Mapper {
  public mapTo{{pascalCase singularName}}Response(source: {{pascalCase singularName}}): {{pascalCase name}}{{pascalCase singularName}}Response {
    const response: {{pascalCase name}}{{pascalCase singularName}}Response = {
   
    };
    return response;
  }
}
