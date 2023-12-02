import { FirebaseApp } from '@infra/firebase/firebase.service';
import { BadRequestException, Body, Controller,HttpCode, InternalServerErrorException, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginMapper } from './login-mapper';
import { LoginRequest } from './login-request';
import { LoginResponse } from './login-response';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth/login')
export class LoginController {
  constructor(
    private readonly firebaseApp: FirebaseApp,
    private readonly mapper: LoginMapper
  ) {}

  @Post()
  @HttpCode(200)
  async execute(@Body() body: LoginRequest): Promise<any> {
    try{
      const request = this.mapper.mapToLoginRequest(body);
      const result =await this.firebaseApp.login(request.email, request.password);
      const response = this.mapper.mapToLoginResponse(result);
      // console.log(response)
      return response;
    } catch (error){
      if(error.code && error.code.includes("auth")){
        throw new BadRequestException(error);
      }else{
        throw new InternalServerErrorException(error);
      }
      
    }
  }
}
