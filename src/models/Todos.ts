import * as AWS from "aws-sdk";
import * as dynamo from "dynamodb";

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
  constructor() {
    dynamo.define(this.tableName(), {
      hashKey: "id",
      timestamps: false,
      schema: {
        id: dynamo.types.uuid()
      }
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
