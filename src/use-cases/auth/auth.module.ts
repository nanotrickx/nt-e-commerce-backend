import { Module } from '@nestjs/common';
import { MongoDbModule } from '@infra/db/mongo-db.module';
import { LoginController } from './login/login.controller';
import { LoginMapper } from './login/login-mapper';
import { FirebaseModule } from '@infra/firebase/firebase.module';
import { SignupController } from './signup/signup.controller';
import { SignupMapper } from './signup/signup-mapper';
import { ForgotPasswordController } from './forgot-password/forgot-password.controller';
import { ForgotPasswordMapper } from './forgot-password/forgot-password-mapper';

@Module({
  imports: [
    MongoDbModule,
    FirebaseModule
  ],
  controllers: [
    LoginController, SignupController, ForgotPasswordController
  ],
  providers: [LoginMapper, SignupMapper, ForgotPasswordMapper]
})
export class AuthUseCasesModule {}
