import * as AWS from "aws-sdk";
import * as dynamo from "dynamodb";
import * as Joi from "joi";

let options = {};
if (process.env.IS_OFFLINE) {
  options = {
    accessKeyId: "key",
    secretAccessKey: "secret",
    region: "localhost",
    endpoint: process.env.DYNAMO_ENDPOINT || "http://localhost:8000"
  };
} else {
  options = {
    region: process.env.REGION
  };
}
dynamo.dynamoDriver(new AWS.DynamoDB(options));

export class Todos {
  private schema: any;

  constructor() {
    this.schema = dynamo.define(this.tableName(), {
      hashKey: "id",
      timestamps: false,
      schema: {
        id: dynamo.types.uuid(),
        text: Joi.string(),
        checked: Joi.boolean().default(false),
        createdAt: Joi.number(),
        updatedAt: Joi.number().default(Date.now, "timestamp")
      }
    });
  }

  public create(text: string): Promise<any> {
    const timestamp = new Date().getTime();

    return new Promise((resolve, reject) => {
      this.schema.create(
        {
          text: text,
          createdAt: timestamp,
          updatedAt: timestamp
        },
        function(err: any, todo: any) {
          if (err) {
            reject(err);
          } else {
            console.log("created account in DynamoDB", todo.get("text"));
            resolve(todo.get());
          }
        }
      );
    });
  }

  public all(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.schema
        .scan()
        .loadAll()
        .exec((err: any, result: any) => {
          if (err) {
            return reject(err);
          }
          if (result.Count === 0 || !result.Items) {
            return resolve([]);
          }
          resolve(result.Items.map((item: any) => item.get()));
        });
    });
  }

  public createTable(): Promise<void> {
    return new Promise((resolve, reject) => {
      let createOptions: { [key: string]: any } = {};
      createOptions[this.tableName()] = {
        readCapacity: 1,
        writeCapacity: 1
      };
      dynamo.createTables(createOptions, (error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  private tableName() {
    return `${process.env.DYNAMO_PREFIX}-todo`;
  }
}
