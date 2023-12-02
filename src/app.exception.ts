import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Injectable
  } from '@nestjs/common';
  import { ValidationError } from 'class-validator';
  import { Response } from 'express';
  import { STATUS_CODES } from 'http';
  @Catch(BadRequestException, ValidationError)
  export class BadRequestFilter implements ExceptionFilter {
    constructor() {}
  
    catch(exception: HttpException, host: ArgumentsHost) {
      if (exception instanceof BadRequestException) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const errorMessage = exception.message;
        const r = exception.getResponse() as any;
  
        const validationErrors = r.message as ValidationError[];
        let statusCode = 400;
  
        response.status(statusCode).json({
          statusCode: statusCode,
          error: STATUS_CODES[statusCode],
          messages: validationErrors
        });
      } else {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const errorMessage = exception.message;
  
        response.status(exception.getStatus()).json({
          statusCode: exception.getStatus(),
          error: exception.getStatus(),
          messages: errorMessage
        });
      }
    }
  }
  
  @Catch()
  @Injectable()
  export class AppExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any {
      console.error(exception);
      console.error(JSON.stringify(exception));
      if (exception instanceof HttpException) {
        new BadRequestFilter().catch(exception, host);
      } else {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
  
        const errorResponse = new ErrorResponseModel();
        errorResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  
        if (exception instanceof Error) {
          errorResponse.messages = 'Looks like something went wrong!';
          if(exception.message){
            errorResponse.messages = exception.message
          }
        } else {
          errorResponse.statusCode = errorResponse.statusCode;
          errorResponse.messages = exception.message;
        }
  
        errorResponse.error = STATUS_CODES[errorResponse.statusCode];
  
        response.status(errorResponse.statusCode).json(errorResponse);
      }
    }
  }
  
  export class ErrorResponseModel {
    statusCode: number;
    error: string;
    messages: string;
  }
  