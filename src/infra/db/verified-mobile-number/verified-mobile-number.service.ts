import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VerifiedMobileNumber } from './verified-mobile-number.schema';
import { ClientSession, Document, Model, Types } from 'mongoose';
import {
  DEFAULT_PAGINATED_ITEMS_COUNT,
  MongooseQueryModel,
  PagedModel
} from '../helper';
import { SortingDirection } from '@common/sorting-direction';

@Injectable()
export class VerifiedMobileNumberService {
  constructor(
    @InjectModel('VerifiedMobileNumber')
    protected readonly model: Model<VerifiedMobileNumber & Document>
  ) {}

  async findAll(model: MongooseQueryModel): Promise<VerifiedMobileNumber[]> {
    const query = this.model.find({ ...model.filter });
    if (model.populate && model.populate.length) {
      query.populate(model.populate);
    }

    if (model.select) {
      query.select(model.select);
    }

    if (model.lean) {
      query.lean();
    }

    if (model.sort) {
      query.sort({ [model.sort]: model.sortBy || 'asc' });
    }

    return query.exec();
  }

  async findById(id: string): Promise<VerifiedMobileNumber> {
    const query = this.model.findById(new Types.ObjectId(id));

    return query.exec();
  }

  async findOne(model: MongooseQueryModel): Promise<VerifiedMobileNumber> {
    const query = this.model.findOne({
      ...model.filter
    });
    if (model.populate && model.populate.length) {
      query.populate(model.populate);
    }

    if (model.select) {
      query.select(model.select);
    }

    if (model.lean) {
      query.lean();
    }

    if (model.sort) {
      query.sort({ [model.sort]: model.sortBy || 'asc' });
    }

    return query.exec();
  }

  async insert(doc: Partial<VerifiedMobileNumber>, session: ClientSession): Promise<any> {
    return await this.model.create([doc], {
      session
    });
  }

  async insertMany(
    doc: Partial<VerifiedMobileNumber[]>,
    session: ClientSession
  ): Promise<VerifiedMobileNumber[]> {
    return await this.model.create(doc, {
      session
    });
  }

  async updateById(
    id: any,
    updatedDoc: any,
    session: ClientSession
  ): Promise<any> {
    return await this.model
      .updateOne({ _id: id }, updatedDoc, { session })
      .exec();
  }

  async update(
    condition: any,
    updatedDoc: any,
    session: ClientSession
  ): Promise<any> {
    return await this.model
      .updateOne(condition, updatedDoc, { session })
      .exec();
  }

  async updateMany(
    filter: any,
    updatedDoc: any,
    session: ClientSession
  ): Promise<any> {
    return this.model.updateMany(filter, updatedDoc, { session, multi: true });
  }

  async pagedAsync(
    pageNumber: any,
    pageSize: any,
    orderByPropertyName: string,
    sortingDirection: SortingDirection,
    filter: { searchKey?: any } = {}
  ): Promise<PagedModel<any>> {
    pageSize = Number(pageSize) || DEFAULT_PAGINATED_ITEMS_COUNT;
    pageNumber = Number(pageNumber) || 1;

    let queryFilter: any = {};
    if (filter.searchKey) {
      queryFilter.$text = { $search: filter.searchKey };
    }
    const query = this.model
      .find({ ...queryFilter })
      .skip(pageSize * pageNumber - pageSize)
      .limit(pageSize);

    if (orderByPropertyName) {
      query.sort({
        [orderByPropertyName]: sortingDirection || SortingDirection.Ascending
      });
    }

    const result = await query.lean().exec();
    result.forEach((doc: any) => {
      doc.id = String(doc._id);
    });
    const numberOfDocs = await this.model.countDocuments({ ...queryFilter });

    return {
      pageNumber: pageNumber,
      totalCount: numberOfDocs,
      totalPages: Math.ceil(numberOfDocs / pageSize),
      pageSize: pageSize,
      orderByPropertyName: orderByPropertyName,
      sortingDirection: sortingDirection,
      items: result
    };
  }

  async count(filter: any = {}): Promise<number> {
    return this.model.count(filter);
  }

  async delete(id: string): Promise<any> {
    return this.model.deleteOne(new Types.ObjectId(id)).exec();
  }

  async deleteMany(filter: any): Promise<any> {
    return this.model.deleteMany({ filter }).exec();
  }

  async isVerifiedMobileNumber(mobileNumber: string, hours: number){
    // Get the current timestamp
    const currentTimestamp = new Date().getTime();
    // Calculate the timestamp 24 hours in the past
    const pastTimestamp = currentTimestamp - hours * 60 * 60 * 1000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    const record =  await this.findOne({filter: {mobileNumber: mobileNumber, verifiedAt: { $gte: pastTimestamp}}})
    if(record && record.mobileNumber){
      return true;
    }else{
      return false;
    }
  }
}
