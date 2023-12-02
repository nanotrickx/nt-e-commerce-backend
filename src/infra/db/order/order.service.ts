import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.schema';
import { ClientSession, Document, Model, Types } from 'mongoose';
import {
  DEFAULT_PAGINATED_ITEMS_COUNT,
  MongooseQueryModel,
  PagedModel
} from '../helper';
import { SortingDirection } from '@common/sorting-direction';
import { ProductVariantService } from '../product-variant/product-variant.service';
import { OrderItem } from '../order-item/order-item.schema';
import _ from 'lodash';
import { OrderItemService } from '../order-item/order-item.service';
import { VerifiedMobileNumberService } from '../verified-mobile-number/verified-mobile-number.service';
import { OrderStatus } from '@common/order';
import { PaymentTransactionsType } from '@common/types';
import { ConfigService } from '@nestjs/config';
import items from 'razorpay/dist/types/items';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order')
    protected readonly model: Model<Order & Document>,
    private productVariantService: ProductVariantService,
    private orderItemService: OrderItemService,
    private verifiedMobileNumberService: VerifiedMobileNumberService,
    private configService: ConfigService
  ) {}

  async findAll(model: MongooseQueryModel): Promise<Order[]> {
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

  async findById(id: string): Promise<Order> {
    const query = this.model.findById(new Types.ObjectId(id)).populate({path: "items", populate: { path: "images"}})
    return query.exec();
  }

  async findOne(model: MongooseQueryModel): Promise<Order> {
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

  async insert(doc: Partial<Order>, session: ClientSession): Promise<any> {
    return await this.model.create([doc], {
      session
    });
  }

  async insertMany(
    doc: Partial<Order[]>,
    session: ClientSession
  ): Promise<Order[]> {
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
    filter: { searchKey?: any, sessionId?: string, accountId?: string, status?: OrderStatus } = {},
    isDraft: boolean = false
  ): Promise<PagedModel<any>> {
    pageSize = Number(pageSize) || DEFAULT_PAGINATED_ITEMS_COUNT;
    pageNumber = Number(pageNumber) || 1;

    let queryFilter: any = {};
    if (filter.searchKey) {
      queryFilter.$text = { $search: filter.searchKey };
    }
    if (filter.sessionId) {
      console.log("session");
      queryFilter.sessionId = filter.sessionId;
    }
    if (filter.accountId) {
      console.log("accountid")
      queryFilter.accountId = filter.accountId;
    }
    if (filter.status) {
      queryFilter.status = filter.status;
    }
    if (filter.status && filter.status == "Draft") {
      isDraft = true;
    }
    if (isDraft === false) {
      queryFilter.status = {$ne: "Draft"}
    }
    const query = this.model
      .find({ ...queryFilter })
      .populate({path: "items", populate: { path: "images"}})
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
      for(let j=0; j<doc.items.length; j++){
        if(doc.items[j].images && doc.items[j].images){
          if(doc.items[j].images.src){
            doc.items[j].images.src = this.configService.get("IMAGES_BASE_URL")+"/"+doc.items[j].images.src;
          }
          doc.items[j].images = [doc.items[j].images];
        }
      }
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

  prepareOrderSubTotals(order: Partial<Order>){
    return new Promise(async (resolve, reject) => {
      try{
        const res:any = { status: true, message: "success", data: {}};
        if(order.productVariantList.length > 0){
          const variantIds = order.productVariantList.map( x => { return new Types.ObjectId(x.variantId)});
          const variantInputDataById = {};
          for(let item of order.productVariantList){
            variantInputDataById[item.variantId] = item;
          }
          const variantData:any =await this.productVariantService.findByIdsWithProduct(variantIds);
          let subTotal = 0;
          let isProductNotAvailable = false;
          let notAvailableProductList = [];
          for(let variant of variantData){
            if(variant.product_id == undefined || variant.product_id.title == undefined){
              let obj = {
                variantId: variant.id
              }
              isProductNotAvailable = true;
              notAvailableProductList.push(obj);
            }
          }
          if(isProductNotAvailable == true){
            res.status=false;
            res.message = {message:"Product Not Available", data: notAvailableProductList};
            reject(res);
          }
          if(variantIds.length == variantData.length){
            let isInSufficientQuantity = false;
            let insufficientQuantityList = [];
            for(let variant of variantData){
              if(variant.inventory_quantity >= variantInputDataById[variant.id].qty){
                if(variant.presentment_prices && variant.presentment_prices[order.currencyCode] && variant.presentment_prices[order.currencyCode].price && variantInputDataById[variant.id] && variantInputDataById[variant.id].qty && variantInputDataById[variant.id].qty > 0){
                  subTotal+= variant.presentment_prices[order.currencyCode].price * variantInputDataById[variant.id].qty;
                }else{
                  const errorMessage = "unable to find some product price"
                  reject(errorMessage);
                }
              }else{
                isInSufficientQuantity = true;
                let obj = {
                  variantId: variant.id,
                  availableQuantity: variant.inventory_quantity
                }
                insufficientQuantityList.push(obj);
              }
            }
            if(isInSufficientQuantity == true){
              res.status=false;
              res.message = {message:"Insufficient Quantity", data: insufficientQuantityList};
              reject(res);
            }else{
              order.subTotal = subTotal;
              res.data = order;
              resolve(res);
            }
            
          }else{
            const errorMessage = "unable to find some product variants"
            reject(errorMessage);
          }
        }else{
          return order;
        }
      }catch(e){
        reject(e)
      }
    });
  }

  checkout(orderData: Partial<Order>, orderId: string, currentOrderVersion: Partial<Order>){
    return new Promise(async (resolve, reject) => {
      try{
        const paymentModes = ["cod", "online-pay"];
        const orderSource = currentOrderVersion;
        orderSource.buyerAddress = orderData.buyerAddress;
        orderSource.shippingAddress = orderData.shippingAddress;
        if(paymentModes.includes(orderData.paymentMode)){
          // checkout functionality
          orderSource.paymentMode = orderData.paymentMode;
          if(orderData.paymentMode == "online-pay"){
            orderSource.shippingCost = 0;
          }
          if(orderData.paymentMode == "cod"){
            orderSource.shippingCost  = this.getShippingCost(orderSource);
          }
          console.log("shipping amount", orderSource.shippingCost);
          orderSource.total = orderSource.subTotal+orderSource.shippingCost;
          const newDoc = JSON.parse(JSON.stringify(orderSource));
          delete newDoc.id;
          const isMobileVerified = await this.checkIsMobileVerified(orderData);
          if(isMobileVerified){
            newDoc.isMobileVerified = true;
          }
          newDoc.mobile = orderData.mobile;
          newDoc.status = OrderStatus.OrderPlaced;
          // console.log("neworder",newDoc)
          if(newDoc.orderStatus && Array.isArray(newDoc.orderStatus)){
            newDoc.orderStatus.push({
              status: "Order Placed",
              timestamp: Math.floor(new Date().getTime() / 1000)
            })
          }else{
            newDoc.orderStatus = [
              {
                status: "Order Placed",
                timestamp: Math.floor(new Date().getTime() / 1000)
              }
            ]
          }
          
          await this.updateById(orderId, newDoc, null);
          const orderItems = await this.prepareOrderItems(currentOrderVersion);
          newDoc.items = orderItems;
          const existingItems =await this.orderItemService.findAll({filter: {orderId: new Types.ObjectId(orderId)}});
          if(existingItems.length > 0){
            const existingItemsVariantIds = existingItems.map(x => String(x.variant_id))
            // console.log("old items", existingItemsVariantIds);
            for(let i=0; i<orderItems.length; i++){
              if(existingItemsVariantIds.includes(String(orderItems[i].variant_id))){
                orderItems.splice(i,1);
              }
            }
          }
          await this.orderItemService.insertMany(orderItems, null);
          resolve("done");
        }else{
          reject("Invaild payment mode")
        }
      }catch(e){
        reject(e)
      }
    });
  }

  async prepareOrderItems(currentOrderVersion: Partial<Order>){
    const variantIds = currentOrderVersion.productVariantList.map( x => { return new Types.ObjectId(x.variantId)});
    const variantData:any =await this.productVariantService.findByIdsWithProduct(variantIds);
    let orderItems = [];
    for(let variant of variantData){
      // console.log("variant", variant);
      const currentVariantindex = _.findIndex(currentOrderVersion.productVariantList, ["variantId", variant.id]);
      let orderItem: any = {
        orderId: new Types.ObjectId(currentOrderVersion.id),
        product_title: variant.product_id.title,
        product_slug: variant.product_id.slug,
        product_type: variant.product_id.product_type,
        images: variant.product_id.images.map(x => new Types.ObjectId(x._id)),
        barcode: variant.barcode,
        sku: variant.sku,
        option: variant.option,
        presentment_prices: variant.presentment_prices,
        product_id: variant.product_id._id,
        requires_shipping: variant.requires_shipping,
        taxable: variant.taxable,
        tax_code: variant.tax_code,
        weight: variant.weight,
        weight_unit: variant.weight_unit,
        variant_id: new Types.ObjectId(variant.id),
        qty: currentOrderVersion.productVariantList[currentVariantindex].qty

      }
      orderItems.push(orderItem);
    }
    // console.log(JSON.stringify(orderItems))
    return orderItems;
  }

  async addPayment(orderId: string, transactionId: string, paymentType: string, paymentGateway: string, amount: number, timestamp: number, status: string){
    let transactionObject: PaymentTransactionsType = {
      transactionId: transactionId,
      paymentType: paymentType,
      paymentGateway: paymentGateway,
      amount: amount,
      timestamp: timestamp,
      status: status
    }
    const doc = {
      $push: {
        paymentTransactions: transactionObject
      }
    }
    return await this.model
      .updateOne({ _id: orderId }, doc, { })
      .exec();
  }

  checkIsMobileVerified(orderData: Partial<Order>){
    return new Promise(async (resolve, reject) => {
      if(orderData.mobile){
        const isVerified = await this.verifiedMobileNumberService.isVerifiedMobileNumber(orderData.mobile, 24);
        console.log("is mobile verified", isVerified);
        if(isVerified){
          resolve(true);
        }else{
          resolve(false);
        }
      }else{
        resolve(false)
      }
    });
  }

  getShippingCost(orderSource: Partial<Order>): number{
    console.log("sub", orderSource.subTotal);
    console.log(" type of", typeof orderSource.subTotal);
    if(orderSource.subTotal<=1000){
      let shippingCost = 60;
      return shippingCost;
    }
    if(orderSource.subTotal>1000 && orderSource.subTotal<=2000){
      let shippingCost = 80;
      return shippingCost;
    }
    if(orderSource.subTotal>2000 && orderSource.subTotal<=4000){
      let shippingCost = 160;
      return shippingCost;
    }
    if(orderSource.subTotal>4000){
      let shippingCost = 200;
      return shippingCost;
    }
  }
}
