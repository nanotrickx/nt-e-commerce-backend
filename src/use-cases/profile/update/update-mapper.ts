import { UpdateProfileResponse } from './update-response';
import { UpdateProfileRequest } from './update-request';
import { User } from '@infra/db/user/user.schema';

export class UpdateProfileMapper {
  public mapToUpdateRequest(source: UpdateProfileRequest, email:string): Partial<User> {
    const response: Partial<User> = {
      firstName: source.firstName,
      lastName: source.lastName,
      email: email
    };
    return response;
  }

  public mapToUpdateResponse(source: User): Partial<UpdateProfileResponse> {
    const response: Partial<UpdateProfileResponse> = {
      id: source.id,
      firstName: source.firstName,
      lastName: source.lastName,
      email: source.email,
    };
    return response;
  }
}
