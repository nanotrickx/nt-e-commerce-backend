import { FirebaseApp } from '@infra/firebase/firebase.service';
import { BadRequestException, Body, Controller,HttpCode, InternalServerErrorException, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ForgotPasswordMapper } from './forgot-password-mapper';
import { ForgotPasswordRequest } from './forgot-password-request';
import { ForgotPasswordResponse } from './forgot-password-response';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth/forgot-password')
export class ForgotPasswordController {
  constructor(
    private readonly firebaseApp: FirebaseApp,
    private readonly mapper: ForgotPasswordMapper
  ) {}

  @Post()
  @HttpCode(200)
  async execute(@Body() body: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const request = this.mapper.mapToForgotPasswordRequest(body);
    try{
      const result:any =await this.firebaseApp.forgotPasswordEmail(request.email);
      return result;
    } catch (error){
      if(error.code && error.code.includes("auth")){
        throw new BadRequestException(error);
      }else{
        throw new InternalServerErrorException(error);
      }
      
    }
      
      
  }
}
