import { SortingDirection } from '@common/sorting-direction';
import { User } from '@infra/db/user/user.schema';
import { PagedModel } from '@infra/db/helper';
import { GetUserResponse } from './get-user-response';

export class GetUserMapper {
  public mapToUserResponse(request: PagedModel<User>): GetUserResponse {
    const response: GetUserResponse = {
      orderByPropertyName: request.orderByPropertyName,
      sortingDirection: SortingDirection.Ascending,
      pageNumber: request.pageNumber,
      pageSize: request.pageSize,
      totalCount: request.totalCount,
      totalPages: request.totalPages,
      items: request.items.map((x) => {
        return {
          id:x.id,
          email: x.email,
          status: x.status,
          createdAt: x.createdAt,
          createdBy: x.createdBy,
          updatedAt: x.updatedAt,
          updatedBy: x.modifiedBy
        };
      })

    };
    return response;
  }
}
