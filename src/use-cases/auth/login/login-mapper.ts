import { LoginRequest} from './login-request';
import { LoginResponse } from './login-response';

interface Login {
  email: string;
  password: string
}

export class LoginMapper {
  public mapToLoginRequest(request: Login): LoginRequest {
    const response: LoginRequest = {
      email: request.email,
      password: request.password
    };
    return response;
  }

  public mapToLoginResponse(source: any): LoginResponse {
    const destination: LoginResponse = {
      idToken: source.idToken,
      refreshToken: source.refreshToken
    };
    return destination;
  }
}
