import { Body, Controller, HttpCode, Param, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateProfileMapper } from './update-mapper';
import { UpdateProfileRequest } from './update-request';
import { UserService } from '@infra/db/user/user.service';

@ApiTags('profiles')
@ApiBearerAuth()
@Controller('profiles')
export class UpdateProfileController {
  constructor(
    private readonly userService: UserService,
    private readonly mapper: UpdateProfileMapper
  ) {}

  @Put('')
  @HttpCode(204)
  async execute(@Body() body: UpdateProfileRequest, @Req() req): Promise<void> {
      const Contact = this.mapper.mapToUpdateRequest(body, req['user'].email);
      Contact.modifiedBy = req['user'].email;
      await this.userService.update( {email: req['user'].email}, Contact, null);
    }
}
