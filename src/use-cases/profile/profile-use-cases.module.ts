import { Module } from '@nestjs/common';
import { MongoDbModule } from '@infra/db/mongo-db.module';
import { CreateProfileController } from './create/create.controller';
import { CreateProfileMapper } from './create/create-mapper';
import { UpdateProfileController } from './update/update.controller';
import { UpdateProfileMapper } from './update/update-mapper';
import { GetProfileController } from './get/get.controller';
import { GetProfileMapper } from './get/get-mapper';

@Module({
  imports: [
    MongoDbModule,
  ],
  controllers: [
    CreateProfileController, UpdateProfileController, GetProfileController
  ],
  providers: [CreateProfileMapper, UpdateProfileMapper, GetProfileMapper]
})
export class ProfileUseCasesModule {}
