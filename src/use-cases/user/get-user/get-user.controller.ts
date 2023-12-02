import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUserMapper } from './get-user-mapper';
import { GetUserRequest } from './get-user-request';
import { UserService } from '@infra/db/user/user.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class GetUserController {
  constructor(
    private readonly userService: UserService,
    private readonly mapper: GetUserMapper
  ) {}

  @Get()
  @HttpCode(200)
  async execute(@Query() query: GetUserRequest): Promise<any> {
    const result = await this.userService.pagedAsync(
      query.pageNumber,
      query.pageSize,
      query.orderByPropertyName,
      query.sortingDirection
    );
    const response = this.mapper.mapToUserResponse(result);
    return response;
  }
}
