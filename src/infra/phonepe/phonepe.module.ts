import { UserModule } from '@infra/db/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PhonepeService } from './phonepe.service';
import { HttpModule } from '@nestjs/axios';
const modules = [
  UserModule,
  ConfigModule,
  HttpModule
];
const providers = [
  PhonepeService
];
@Module({
  imports: [...modules],
  providers: [...providers],
  exports: [...modules, ...providers]
})
export class PhonepeClientModule {}
