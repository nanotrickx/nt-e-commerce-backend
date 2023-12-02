import { Module } from '@nestjs/common';
import { MongoDbModule } from '@infra/db/mongo-db.module';
import { GetUserController } from './get-user/get-user.controller';
import { GetUserMapper } from './get-user/get-user-mapper';

@Module({
  imports: [
    MongoDbModule
  ],
  controllers: [
    GetUserController,
  ],
  providers: [GetUserMapper]
})
export class UserUseCasesModule {}
