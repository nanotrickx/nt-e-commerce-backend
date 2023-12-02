import { SortingDirection } from '@common/sorting-direction';
import { {{pascalCase singularName}} } from '@infra/db/{{dashCase singularName}}/{{dashCase singularName}}.schema';
import { PagedModel } from '@infra/db/helper';
import { {{pascalCase name}}{{pascalCase singularName}}Response } from './{{dashCase name}}-response';

export class {{pascalCase name}}{{pascalCase singularName}}Mapper {
  public mapTo{{pascalCase singularName}}Response(request: PagedModel<{{pascalCase singularName}}>): {{pascalCase name}}{{pascalCase singularName}}Response {
    const response: {{pascalCase name}}{{pascalCase singularName}}Response = {
      orderByPropertyName: request.orderByPropertyName,
      sortingDirection: SortingDirection.Ascending,
      pageNumber: request.pageNumber,
      pageSize: request.pageSize,
      totalCount: request.totalCount,
      totalPages: request.totalPages,
      items: request.items.map((x) => {
        return {
          id:x.id,
          createdAt: x.created_at,
          createdBy: x.created_by,
          updatedAt: x.updated_at,
          updatedBy: x.modified_by
        };
      })
    };
    return response;
  }
}
