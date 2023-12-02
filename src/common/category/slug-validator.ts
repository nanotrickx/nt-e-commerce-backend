import { Category } from "@infra/db/category/category.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Model } from "mongoose";

@ValidatorConstraint({ name: 'ProductSlugExists', async: true })
@Injectable()
export class CategorySlugCheck implements ValidatorConstraintInterface {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}
  async validate(value: string) {
    try {
        const count = await this.categoryModel.count({slug: value})
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
    return `Category slug Should be Unique`;
  }
}