import { SendOtpOtpRequest, VerifyOtpRequest } from './send-otp-request';
import { SendOtpOtpResponse } from './send-otp-response';

export class SendOtpMapper {
  public mapToSendOtpOtpRequest(source: SendOtpOtpRequest): Partial<SendOtpOtpRequest>{
    const response: Partial<SendOtpOtpRequest> = {
      mobileNo : source.mobileNo
    };
    return response;
  }

  public mapToVerifyOtpOtpRequest(source: VerifyOtpRequest): Partial<SendOtpOtpRequest>{
    const response: Partial<VerifyOtpRequest> = {
      mobileNo: source.mobileNo,
      otp: source.otp
    };
    return response;
  }

  public mapToSendOtpOtpResponse(source: any): SendOtpOtpResponse {
    const response: SendOtpOtpResponse = {
      
    };
    return response;
  }
}
