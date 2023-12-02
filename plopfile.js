module.exports = function (plop) {
    plop.setGenerator("schema", {
      description: "Generate Entity Code!",
      prompts: [
        {
          type: "input",
          name: "name",
          message: "Enter Entity Name",
        },
      ],
      actions: [
        {
          type: "addMany",
          base: ".generators/infra/db/",
          destination: "src/infra/db/",
          templateFiles: ".generators/infra/db/",
        },
        {
          type: "append",
          path: "src/infra/db/mongo-db.module.ts",
          pattern: `/* PLOP_INJECT_MODULE */`,
          template: `\t{{pascalCase name}}Module,`,
        },
        {
          type: "append",
          path: "src/infra/db/mongo-db.module.ts",
          pattern: `/* PLOP_INJECT_IMPORT */`,
          template: `import { {{pascalCase name}}Module } from './{{dashCase name}}/{{dashCase name}}.module';`,
        }
      ],
    });

    // REST
    plop.setGenerator("GET-Blank", {
      description: "Generate GET Blank Operation!",
      prompts: [
        {
          type: "input",
          name: "name",
          message: "Enter name",
        },
        {
          type: "input",
          name: "singularName",
          message: "Enter  Schema Singular Name",
        },
        {
          type: "input",
          name: "pluralName",
          message: "Enter Schema Plural name",
        },
      ],
      actions: [
        {
          type: "addMany",
          base: ".generators/use-cases/get/",
          destination: process.cwd(),
          templateFiles: ".generators/use-cases/get/",
        },
      ],
    });

    plop.setGenerator("GET-List-Blank", {
      description: "Generate GET Blank Operation!",
      prompts: [
        {
          type: "input",
          name: "name",
          message: "Enter name",
        },
        {
          type: "input",
          name: "singularName",
          message: "Enter  Schema Singular Name",
        },
        {
          type: "input",
          name: "pluralName",
          message: "Enter Schema Plural name",
        },
      ],
      actions: [
        {
          type: "addMany",
          base: ".generators/use-cases/get-list/",
          destination: process.cwd(),
          templateFiles: ".generators/use-cases/get-list/",
        },
      ],
    });

    plop.setGenerator("POST-Blank", {
      description: "Generate POST Blank Operation!",
      prompts: [
        {
          type: "input",
          name: "name",
          message: "Enter name",
        },
        {
          type: "input",
          name: "singularName",
          message: "Enter  Schema Singular Name",
        },
        {
          type: "input",
          name: "pluralName",
          message: "Enter Schema Plural name",
        },
      ],
      actions: [
        {
          type: "addMany",
          base: ".generators/use-cases/post/",
          destination: process.cwd(),
          templateFiles: ".generators/use-cases/post/",
        },
      ],
    });

    plop.setGenerator("PUT-Blank", {
      description: "Generate PUT Blank Operation!",
      prompts: [
        {
          type: "input",
          name: "name",
          message: "Enter name",
        },
        {
          type: "input",
          name: "singularName",
          message: "Enter  Schema Singular Name",
        },
        {
          type: "input",
          name: "pluralName",
          message: "Enter Schema Plural name",
        },
      ],
      actions: [
        {
          type: "addMany",
          base: ".generators/use-cases/put/",
          destination: process.cwd(),
          templateFiles: ".generators/use-cases/put/",
        },
      ],
    });


    plop.setGenerator("DELETE-Blank", {
      description: "Generate DELETE Blank Operation!",
      prompts: [
        {
          type: "input",
          name: "name",
          message: "Enter name",
        },
        {
          type: "input",
          name: "singularName",
          message: "Enter  Schema Singular Name",
        },
        {
          type: "input",
          name: "pluralName",
          message: "Enter Schema Plural name",
        },
      ],
      actions: [
        {
          type: "addMany",
          base: ".generators/use-cases/delete/",
          destination: process.cwd(),
          templateFiles: ".generators/use-cases/delete/",
        },
      ],
    });
  };