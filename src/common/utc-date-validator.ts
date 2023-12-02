import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UtcDateCheck implements ValidatorConstraintInterface {
  async validate(value: string) {
    try {
        if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(value)) return false;
        const d = new Date(value); 
        const result = d instanceof Date && !isNaN(d as any) && d.toISOString()===value; // valid date
        return result;
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid Time Format. Should Follow this format: 2023-03-01T10:50:43.000Z`;
  }
}