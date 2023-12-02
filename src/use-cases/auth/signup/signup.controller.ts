import { User } from '@infra/db/user/user.schema';
import { UserService } from '@infra/db/user/user.service';
import { FirebaseApp } from '@infra/firebase/firebase.service';
import { BadRequestException, Body, Controller,HttpCode, InternalServerErrorException, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignupMapper } from './signup-mapper';
import { SignupRequest } from './signup-request';
import { SignupResponse } from './signup-response';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth/signup')
export class SignupController {
  constructor(
    private readonly firebaseApp: FirebaseApp,
    private readonly mapper: SignupMapper,
    private readonly userService: UserService
  ) {}

  @Post()
  @HttpCode(200)
  async execute(@Body() body: SignupRequest): Promise<SignupResponse> {
    const request = this.mapper.mapToSignupRequest(body);
    try{
      const result:any =await this.firebaseApp.signup({firstName: request.firstName, lastName: request.lastName , email: request.email, password: request.password});
      const userInfo: Partial<User> = {
        identityServerUserId: result.uid,
        providerId: ""
      }
      if( result && result.providerData[0] && result.providerData[0] && result.providerData[0].providerId){
        userInfo.providerId= result.providerData[0].providerId;
      }
      const user: Partial<User> = this.mapper.mapToSignupRequest(body);
        user.identityServerUserId = userInfo.identityServerUserId;
        user.providerId = userInfo.providerId;
        const userResult= await this.userService.insert(user, null);
        if(userResult){
          const response = this.mapper.mapToSignupResponse(userResult[0]);
          return response;
        }
    } catch (error){
      if(error.code && error.code.includes("auth")){
        throw new BadRequestException(error);
      }else{
        throw new InternalServerErrorException(error);
      }
      
    }
      
      
  }
}
