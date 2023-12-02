import { Module } from '@nestjs/common';
import { DashboardUseCasesModule } from './dashboard/dashboard-use-cases.module';
import { OrderUseCasesModule } from './order/order-use-cases.module';
import { PresignUseCasesModule } from './presign/presign-use-case.module';
import { ProductImageUseCasesModule } from './product-image/product-use-cases.module';
import { ProductVariantUseCasesModule } from './product-variant/product-variant-use-cases.module';
import { ProductUseCasesModule } from './product/product-use-cases.module';
import { ProfileUseCasesModule } from './profile/profile-use-cases.module';
import { UserUseCasesModule } from './user/user-use-cases.module';
import { CategoryUseCasesModule } from './category/category-use-cases.module';
import { WebhookUseCasesModule } from './razorpay-webhook/webhook-use-cases.module';
import { OtpUseCasesModule } from './otp/otp-use-cases.module';
import { WebhookStripUseCasesModule } from './webhook-stripe/webhook-stripe-use-cases.module';
import { WebhookPhonepeUseCasesModule } from './webhook-phonepe/webhook-phonepe-use-cases.module';

@Module({
  imports: [ 
    UserUseCasesModule, 
    PresignUseCasesModule,
    ProfileUseCasesModule,
    DashboardUseCasesModule,
    ProductUseCasesModule,
    ProductImageUseCasesModule,
    ProductVariantUseCasesModule,
    OrderUseCasesModule,
    CategoryUseCasesModule,
    WebhookUseCasesModule,
    OtpUseCasesModule,
    WebhookStripUseCasesModule,
    WebhookPhonepeUseCasesModule
  ],
  controllers: [],
  providers: []
})
export class UseCasesModule {}
