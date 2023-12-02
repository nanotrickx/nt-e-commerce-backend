import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductVariant } from './product-variant.schema';
import { ClientSession, Document, Model, Types } from 'mongoose';
import {
  DEFAULT_PAGINATED_ITEMS_COUNT,
  MongooseQueryModel,
  PagedModel
} from '../helper';
import { SortingDirection } from '@common/sorting-direction';

@Injectable()
export class ProductVariantService {
  constructor(
    @InjectModel('ProductVariant')
    protected readonly model: Model<ProductVariant & Document>
  ) {}

  async findAll(model: MongooseQueryModel): Promise<ProductVariant[]> {
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

  async findById(id: string): Promise<ProductVariant> {
    const query = this.model.findById(new Types.ObjectId(id));

    return query.exec();
  }

  async findOne(model: MongooseQueryModel): Promise<ProductVariant> {
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

  async insert(doc: Partial<ProductVariant>, session: ClientSession): Promise<any> {
    return await this.model.create([doc], {
      session
    });
  }

  async insertMany(
    doc: Partial<ProductVariant[]>,
    session: ClientSession
  ): Promise<ProductVariant[]> {
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

  async findByIds(ids: Array<Types.ObjectId>): Promise<ProductVariant[]> {
    const query = this.model.find({"_id": {"$in": ids} })
    return query.exec();
  }

  async findByIdsWithProduct(ids: Array<Types.ObjectId>): Promise<ProductVariant[]> {
    const query = this.model.find({"_id": {"$in": ids} }).populate({path: "product_id", populate: { path: "images"}})
    return query.exec();
  }

  async insertOrUpdateOne(filter: Record<string,any>,doc: Record<string,any>){
    const query = filter;
    const update = { $set: doc};
    const options = { upsert: true };
    const res = await this.model.updateOne(query, update, options);
    // console.log(res)
    return res;
  }
}
