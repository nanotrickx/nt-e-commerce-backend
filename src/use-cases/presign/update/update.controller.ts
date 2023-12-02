import { S3Service } from '@infra/s3/s3.service';
import { Body, Controller,HttpCode, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdatePresignMapper } from './update-mapper';
import { UpdatePresignRequest } from './update-request';

@ApiTags('presign')
@ApiBearerAuth()
@Controller('update-presign')
export class UpdatePresignController {
  constructor(
    private readonly s3: S3Service,
    private readonly mapper: UpdatePresignMapper,
  ) {}

  @Post()
  @HttpCode(201)
  async execute(@Body() body: UpdatePresignRequest): Promise<any> {
      const request = this.mapper.mapToCreateRequest(body);
      const fileName= `${request.fileName}`;
      const url =await this.s3.getSignedUrl(fileName);
      return { fileName: fileName , url: url};
  }
}
