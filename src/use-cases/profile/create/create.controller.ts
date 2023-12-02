import { Body, Controller,HttpCode, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProfileMapper } from './create-mapper';
import { CreateProfileRequest } from './create-request';
import { UserService } from '@infra/db/user/user.service';
@ApiTags('profiles')
@ApiBearerAuth()
@Controller('profiles')
export class CreateProfileController {
  constructor(
    private readonly userService: UserService,
    private readonly mapper: CreateProfileMapper,
  ) {}

  @Post()
  @HttpCode(201)
  async execute(@Body() body: CreateProfileRequest, @Req() req): Promise<any> {
      const Contact = this.mapper.mapToCreateRequest(body, req['user'].email);
      Contact.createdBy = req['user'].email;
      Contact.modifiedBy = req['user'].email;
      
  }
}
