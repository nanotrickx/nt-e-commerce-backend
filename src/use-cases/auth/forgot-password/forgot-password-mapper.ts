import { ForgotPasswordRequest} from './forgot-password-request';
import { ForgotPasswordResponse } from './forgot-password-response';

export class ForgotPasswordMapper {
  public mapToForgotPasswordRequest(request: ForgotPasswordRequest): ForgotPasswordRequest {
    const response: ForgotPasswordRequest = {
      email: request.email
    };
    return response;
  }
}
