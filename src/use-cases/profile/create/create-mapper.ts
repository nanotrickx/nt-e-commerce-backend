import { User } from '@infra/db/user/user.schema';
import { CreateProfileRequest } from './create-request';
import { CreateProfileResponse } from './create-response';

export class CreateProfileMapper {
  public mapToCreateRequest(source: CreateProfileRequest, email: string): Partial<User>{
    const response: Partial<User> = {
      firstName: source.firstName,
      lastName: source.lastName,
      email: email
    };
    return response;
  }

  public mapToCreateResponse(source: User): CreateProfileResponse {
    const response: CreateProfileResponse = {
      id: source.id,
      firstName: source.firstName,
      lastName: source.lastName,
      email: source.email,
    };
    return response;
  }
}
