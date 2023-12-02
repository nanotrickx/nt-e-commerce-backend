import { Injectable } from '@nestjs/common';
import { ClientSession } from 'mongoose';
import { MAX_TRANSACTION_RETRY_TIMEOUT } from './helper';
import { InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class UnitOfWorkService {
  constructor(
    @InjectConnection() private readonly connection: mongoose.Connection
  ) {}

  private async startSession(): Promise<ClientSession> {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }

  private async commitTransaction(session: ClientSession) {
    await session.commitTransaction();
    session.endSession();
  }

  private async abortTransaction(session: ClientSession) {
    await session.abortTransaction();
    session.endSession();
  }

  async withRetrySession(txnFn: Function) {
    const startTime = Date.now();
    while (true) {
      const session = await this.startSession();
      try {
        const result = await txnFn(session);
        await this.commitTransaction(session);
        return result;
      } catch (e: any) {
        const isTransientError =
          e.errorLabels &&
          e.errorLabels.includes('TransientTransactionError') &&
          this.hasNotTimedOut(startTime, MAX_TRANSACTION_RETRY_TIMEOUT);
        const isCommitError =
          e.errorLabels &&
          e.errorLabels.includes('UnknownTransactionCommitResult') &&
          this.hasNotTimedOut(startTime, MAX_TRANSACTION_RETRY_TIMEOUT);

        if (!isTransientError || !isCommitError) {
          await this.handleError(session, e);
        }
      }
    }
  }

  private async handleError(session: ClientSession, err: any) {
    await this.abortTransaction(session);
    throw err;
  }

  private hasNotTimedOut(startTime: number, max: number) {
    return Date.now() - startTime < max;
  }
}
