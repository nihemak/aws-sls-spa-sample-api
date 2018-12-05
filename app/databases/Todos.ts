import DynamoDB from "aws-sdk/clients/dynamodb";
import {
  attribute,
  autoGeneratedHashKey,
  table
} from "@aws/dynamodb-data-mapper-annotations";
import { DataMapper } from "@aws/dynamodb-data-mapper";

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
const dynamodb = new DynamoDB(options);
const prefix = `${process.env.DYNAMO_PREFIX}-`;
const tableName = `${prefix}todos`;
const mapper = new DataMapper({
  client: dynamodb,
  tableNamePrefix: prefix
});

@table("todos")
export class TodoRecord {
  @autoGeneratedHashKey()
  id!: string;

  @attribute()
  userId!: string;

  @attribute()
  text!: string;

  @attribute({ defaultProvider: () => false })
  checked!: boolean;

  @attribute({ defaultProvider: () => new Date().getTime() })
  createdAt!: number;

  @attribute({ defaultProvider: () => new Date().getTime() })
  updatedAt!: number;
}

export class Todos {
  public async create(userId: string, text: string): Promise<TodoRecord> {
    const toSave = Object.assign(new TodoRecord(), {
      userId: userId,
      text: text
    });
    const objectSaved = await mapper.put(toSave);
    console.log("created todo in DynamoDB", objectSaved.text);
    return objectSaved;
  }

  public async all(): Promise<TodoRecord[]> {
    const iterator = mapper.scan(TodoRecord);
    const todos: TodoRecord[] = [];
    // tslint:disable-next-line
    for await (const record of iterator) {
      todos.push(record);
    }
    return todos;
  }

  public async listByUserId(userId: string): Promise<TodoRecord[]> {
    const iterator = mapper.query(
      TodoRecord,
      { userId: userId },
      { indexName: "userIdIdx" }
    );
    const todos: TodoRecord[] = [];
    // tslint:disable-next-line
    for await (const record of iterator) {
      todos.push(record);
    }
    return todos;
  }

  public async get(id: string): Promise<TodoRecord | {}> {
    const myItem = await mapper.get(
      Object.assign(new TodoRecord(), { id: id })
    );
    return myItem;
  }

  public async update(
    id: string,
    text: string | undefined,
    checked: boolean | undefined
  ): Promise<TodoRecord> {
    const myItem = await mapper.get(
      Object.assign(new TodoRecord(), { id: id })
    );
    if (typeof text !== "undefined") {
      myItem.text = text;
    }
    if (typeof checked !== "undefined") {
      myItem.checked = checked;
    }
    myItem.updatedAt = new Date().getTime();
    const objectSaved = await mapper.update(myItem);
    return objectSaved;
  }

  public async delete(id: string): Promise<void> {
    await mapper.delete(Object.assign(new TodoRecord(), { id: id }));
  }

  public async createTable(rc: number, wc: number): Promise<void> {
    await mapper.createTable(TodoRecord, {
      readCapacityUnits: rc,
      writeCapacityUnits: wc
    });
    const params = {
      AttributeDefinitions: [
        {
          AttributeName: "userId",
          AttributeType: "S"
        },
        {
          AttributeName: "createdAt",
          AttributeType: "N"
        }
      ],
      GlobalSecondaryIndexUpdates: [
        {
          Create: {
            IndexName: "userIdIdx",
            KeySchema: [
              {
                AttributeName: "userId",
                KeyType: "HASH"
              },
              {
                AttributeName: "createdAt",
                KeyType: "RANGE"
              }
            ],
            Projection: {
              ProjectionType: "ALL"
            },
            ProvisionedThroughput: {
              ReadCapacityUnits: 1,
              WriteCapacityUnits: 1
            }
          }
        }
      ],
      TableName: tableName
    };
    dynamodb.updateTable(params, function(err) {
      if (err) {
        throw err;
      }
    });
  }

  public async ensureTableNotExists(): Promise<void> {
    await mapper.ensureTableNotExists(TodoRecord);
  }
}
