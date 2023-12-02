import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseApp } from './firebase.service';
const modules = [
  ConfigModule
];
const providers = [
    FirebaseApp
];
@Module({
  imports: [...modules],
  providers: [...providers],
  exports: [...modules, ...providers]
})
export class FirebaseModule {}
