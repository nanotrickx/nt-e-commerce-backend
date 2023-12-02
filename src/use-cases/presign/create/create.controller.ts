import { S3Service } from '@infra/s3/s3.service';
import { Body, Controller,HttpCode, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePresignMapper } from './create-mapper';
import { CreatePresignRequest } from './create-request';
import {v4 as uuidv4} from 'uuid';

@ApiTags('presign')
@ApiBearerAuth()
@Controller('create-presign')
export class CreatePresignController {
  constructor(
    private readonly s3: S3Service,
    private readonly mapper: CreatePresignMapper,
  ) {}

  @Post()
  @HttpCode(201)
  async execute(@Body() body: CreatePresignRequest): Promise<any> {
      const request = this.mapper.mapToCreateRequest(body);
      const name = uuidv4();
      const fileName= `${request.filePath}/${name}.${request.fileExtension}`;
      const url =await this.s3.getSignedUrl(fileName);
      return { fileName: fileName , url: url};
  }
}
