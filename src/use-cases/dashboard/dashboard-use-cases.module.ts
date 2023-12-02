import { Module } from '@nestjs/common';
import { MongoDbModule } from '@infra/db/mongo-db.module';
import { GetDashboardController } from './get-dashboard/get-dashboard.controller';

@Module({
  imports: [
    MongoDbModule,
  ],
  controllers: [
    GetDashboardController
  ],
  providers: []
})
export class DashboardUseCasesModule {}
