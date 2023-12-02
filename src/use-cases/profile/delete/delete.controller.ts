import { Controller, Delete, HttpCode, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '@infra/db/user/user.service';

@ApiTags('profiles')
@ApiBearerAuth()
@Controller('profiles')
export class DeletePofileController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Delete(':id')
  @HttpCode(204)
  async execute(@Param('id') id: string): Promise<void> {
    await this.userService.delete(id);
  }
}
