import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { {{pascalCase name}}, {{pascalCase name}}Schema } from './{{dashCase name}}.schema';
import { {{pascalCase name}}Service } from './{{dashCase name}}.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: {{pascalCase name}}.name,
        useFactory: () => {
          const schema = {{pascalCase name}}Schema;
          schema.pre('save', function () {
            // console.log('Hello from pre save');
          });
          return schema;
        }
      }
    ])
  ],
  providers: [{{pascalCase name}}Service],
  exports: [{{pascalCase name}}Service]
})
export class {{pascalCase name}}Module {}
