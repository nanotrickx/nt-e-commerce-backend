import { User } from '@infra/db/user/user.schema';
import { SignupRequest} from './signup-request';
import { SignupResponse } from './signup-response';

export class SignupMapper {
  public mapToSignupRequest(request: SignupRequest): Partial<User & {password: string}> {
    const response: Partial<User & {password: string}> = {
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      roles: ["user"],
      password: request.password
    };
    return response;
  }

  public mapToSignupResponse(source: any): SignupResponse {
    const destination: SignupResponse = {
      id: source.id,
      firstName: source.firstName,
      lastName: source.lastName,
      providerId: source.providerId,
      identityServerUserId: source.identityServerUserId,
      email: source.email,
      createdAt: source.createdAt,
      updatedAt: source.updatedAt
    };
    return destination;
  }
}
