import { User } from '@infra/db/user/user.schema';
import { GetProfileResponse } from './get-response';

export class GetProfileMapper {
  public mapToGetResponse(request: User, account: {type: string}): GetProfileResponse {
    const response: GetProfileResponse = {
      id: request.id,
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      plan: account
    };
    return response;
  }
}
