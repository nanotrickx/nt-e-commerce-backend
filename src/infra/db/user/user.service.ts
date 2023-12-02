import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { ClientSession, Document, Model, Types } from 'mongoose';
import {
  DEFAULT_PAGINATED_ITEMS_COUNT,
  MongooseQueryModel,
  PagedModel
} from '../helper';
import { SortingDirection } from '@common/sorting-direction';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    protected readonly model: Model<User & Document>
  ) {}

  async findAll(model: MongooseQueryModel): Promise<User[]> {
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

  async findById(id: string): Promise<User> {
    const query = this.model.findById(new Types.ObjectId(id));

    return query.exec();
  }

  async findOne(model: MongooseQueryModel): Promise<User> {
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

  async insert(doc: Partial<User>, session: ClientSession): Promise<any> {
    return await this.model.create([doc], {
      session
    });
  }

  async insertMany(
    doc: Partial<User[]>,
    session: ClientSession
  ): Promise<User[]> {
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
}
