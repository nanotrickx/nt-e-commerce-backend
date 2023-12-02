import { Controller, Get, HttpCode, Param, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetProfileMapper } from './get-mapper';
import { UserService } from '@infra/db/user/user.service';
import { GetProfileResponse } from './get-response';

@ApiTags('profiles')
@ApiBearerAuth()
@Controller('profiles')
export class GetProfileController {
  constructor(
    private readonly userService: UserService,
    private readonly mapper: GetProfileMapper
  ) {}

  @Get('')
  @HttpCode(200)
  async execute( @Req() req): Promise<GetProfileResponse> {
      let result = await this.userService.findOne({filter: {email: req['user'].email}});
      const account =  {
        type: "free"
      };
      const response = this.mapper.mapToGetResponse(result, account)
      return response;
    }
}
