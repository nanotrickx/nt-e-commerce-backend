import { Module } from '@nestjs/common';
import { MongoDbModule } from '@infra/db/mongo-db.module';
import { CreateOrderController } from './create/create.controller';
import { GetOrderController } from './get/get.controller';
import { GetListOrderController } from './get-list/get-list.controller';
import { UpdateOrderController } from './update/update.controller';
import { DeleteOrderController } from './delete/delete.controller';
import { CreateOrderMapper } from './create/create-mapper';
import { GetOrderMapper } from './get/get-mapper';
import { GetListOrderMapper } from './get-list/get-list-mapper';
import { UpdateOrderMapper } from './update/update-mapper';
import { RazerpayModule } from '@infra/razorpay/razorpay.module';
import { StripeClientModule } from '@infra/stripe/stripe.module';
import { PhonepeClientModule } from '@infra/phonepe/phonepe.module';
import { PdfModule } from '@infra/pdf/pdf.module';
import { GetInvoiceController } from './get-invoice/get.controller';

@Module({
  imports: [
    MongoDbModule,
    RazerpayModule,
    StripeClientModule,
    PhonepeClientModule,
    PdfModule
  ],
  controllers: [
    CreateOrderController,
    GetOrderController,
    GetListOrderController,
    UpdateOrderController,
    DeleteOrderController,
    GetInvoiceController
  ],
  providers: [CreateOrderMapper, GetOrderMapper, GetListOrderMapper, UpdateOrderMapper]
})
export class OrderUseCasesModule {}
