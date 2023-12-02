import { Module } from '@nestjs/common';
import { MongoDbModule } from '@infra/db/mongo-db.module';
import { S3Module } from '@infra/s3/s3.module';
import { CreatePresignController } from './create/create.controller';
import { CreatePresignMapper } from './create/create-mapper';
import { UpdatePresignController } from './update/update.controller';
import { UpdatePresignMapper } from './update/update-mapper';

@Module({
  imports: [
    MongoDbModule,
    S3Module
  ],
  controllers: [
    CreatePresignController, UpdatePresignController
  ],
  providers: [CreatePresignMapper, UpdatePresignMapper]
})
export class PresignUseCasesModule {}
