import { injectable } from "inversify";
import "reflect-metadata";
import { Todos as ITodos } from "../Todos";
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

@injectable()
export class Todos implements ITodos {
  private schema: any;

  constructor() {
    this.schema = dynamo.define(this.tableName(), {
      hashKey: "id",
      timestamps: false,
      schema: {
        id: dynamo.types.uuid(),
        text: Joi.string(),
        checked: Joi.boolean().default(false),
        createdAt: Joi.number().default(Date.now, "timestamp"),
        updatedAt: Joi.number().default(Date.now, "timestamp")
      }
    });
  }

  public create(text: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.schema.create(
        {
          text: text
        },
        function(err: any, todo: any) {
          if (err) {
            reject(err);
          } else {
            console.log("created todo in DynamoDB", todo.get("text"));
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

  public get(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.schema.get(id, (err: any, result: any) => {
        if (err) {
          return reject(err);
        }
        if (!result) {
          return resolve({});
        }
        resolve(result.get());
      });
    });
  }

  public update(id: string, text: string, checked: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      const timestamp = new Date().getTime();
      this.schema.update(
        {
          id: id,
          text: text,
          checked: checked,
          updatedAt: timestamp
        },
        (err: any, result: any) => {
          if (err) {
            return reject(err);
          }
          resolve(result.get());
        }
      );
    });
  }

  public delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.schema.destroy(id, (err: any) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  public createTable(rc: number, wc: number): Promise<void> {
    return new Promise((resolve, reject) => {
      let createOptions: { [key: string]: any } = {};
      createOptions[this.tableName()] = {
        readCapacity: rc,
        writeCapacity: wc
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