import { Product } from "@infra/db/product/product.schema";
import { ProductService } from "@infra/db/product/product.service";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Model } from "mongoose";

@ValidatorConstraint({ name: 'ProductSlugExists', async: true })
@Injectable()
export class ProductSlugCheck implements ValidatorConstraintInterface {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}
  async validate(value: string) {
    try {
        const count = await this.productModel.count({slug: value})
        if(count > 0){
            return false;
        }else{
            return true;
        }
    } catch (e) {
        console.log(e)
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Product slug Should be Unique`;
  }
}