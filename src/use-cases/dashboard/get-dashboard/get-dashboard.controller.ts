import { Controller, Get, HttpCode, Query, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetDashboardRequestParams } from './get-dashboard.request';

@ApiTags('dashboard')
@ApiBearerAuth()
@Controller('dashboard')
export class GetDashboardController {
  constructor(
    private configService: ConfigService
  ) { }

  @Get()
  @HttpCode(200)
  async execute(@Req() req, @Query() params: GetDashboardRequestParams): Promise<any> {
    
  }
}
