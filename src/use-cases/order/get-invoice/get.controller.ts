import { Controller, Get, HttpCode,Param, Query, BadRequestException, NotFoundException, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetOrderMapper } from './get-mapper';
import { GetOrderRequest } from './get-request';
import { OrderService } from '@infra/db/order/order.service';
import { PdfService } from '@infra/pdf/pdf.service';
import { Response } from 'express';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('invoice')
export class GetInvoiceController {
  constructor(
    private readonly orderService: OrderService,
    private readonly pdfService: PdfService
  ) {}

  @Get(':id')
  @HttpCode(200)
  async execute(@Param('id') id: string, @Query() query: GetOrderRequest, @Res() res: Response): Promise<any> {
    try{
      const result = await this.orderService.findById(id);
      // console.log(JSON.stringify(result.items));
      if(result){
        const buffer = await this.pdfService.invoice(result);
        res.set({
          // pdf
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename=pdf.pdf`,
          'Content-Length': buffer.length,
          // prevent cache
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: 0,
        });
        res.end(buffer);
        return ""
      }else{
        throw new NotFoundException("Record Not Found");
      }
      
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
