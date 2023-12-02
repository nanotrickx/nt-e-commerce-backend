import { Injectable, InternalServerErrorException, Scope } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { S3Client, GetObjectCommand, S3ClientConfig, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  constructor(private configService: ConfigService) {}

  private getS3() {
    return new S3Client({
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_SECRET_KEY')
      },
      region: this.configService.get('AWS_REGION')
    });
  }

  async getSignedUrl(
    fileName: string,
  ): Promise<String> {
    const params = {
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
        Key: fileName
    }
    try {
        const command = new PutObjectCommand(params);
        const result = await getSignedUrl(this.getS3(), command, { expiresIn: 60*5 });
        return result;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
