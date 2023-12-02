import { UseCasesModule } from './use-cases/use-cases.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PreAuthMiddleware } from './infra/firebase/pre-auth-middleware';
import { AuthUseCasesModule } from './use-cases/auth/auth.module';
import { FirebaseModule } from '@infra/firebase/firebase.module';
import { APP_FILTER } from '@nestjs/core';
import { AppExceptionFilter } from './app.exception';
import { UserInfoMiddleware } from '@infra/firebase/user-info-middleware';
// import { RedisModule } from '@liaoliaots/nestjs-redis';
import { StripeClientModule } from '@infra/stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI
    ),
    StripeClientModule,
    UseCasesModule,
    AuthUseCasesModule,
    FirebaseModule,
    // RedisModule.forRoot({
    //   config: {
    //     host: process.env.REDIS_HOST,
    //     port: parseInt(process.env.REDIS_PORT),
    //     password: process.env.REDIS_PASSWORD, // Provide your Redis password here
    //   }
    // }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreAuthMiddleware)
    .exclude(
      {path: "/auth/login", method: RequestMethod.POST},
      {path: "auth/signup", method: RequestMethod.POST},
      {path: "auth/forgot-password", method: RequestMethod.POST},
      {path: "products", method: RequestMethod.GET},
      {path: "categories", method: RequestMethod.GET},
      {path: "categories/(.*)", method: RequestMethod.GET},
      {path: "products/(.*)", method: RequestMethod.GET},
      {path: "orders", method: RequestMethod.GET},
      {path: "orders/(.*)", method: RequestMethod.GET},
      {path: "invoice/(.*)", method: RequestMethod.GET},
      {path: "orders", method: RequestMethod.POST},
      {path: "checkout/(.*)", method: RequestMethod.PUT},
      {path: "webhooks", method: RequestMethod.POST},
      {path: "webhook-stripe", method: RequestMethod.POST},
      {path: "webhook-phonepe", method: RequestMethod.POST},
      {path: "otp", method: RequestMethod.POST},
      {path: "otp/(.*)", method: RequestMethod.POST},
    )
    .forRoutes({path:'*',method:RequestMethod.ALL})
    .apply(UserInfoMiddleware) // Add another middleware here
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
