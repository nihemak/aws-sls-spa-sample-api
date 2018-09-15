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
const mapper = new DataMapper({
  client: new DynamoDB(options),
  tableNamePrefix: `${process.env.DYNAMO_PREFIX}-`
});

@table("todos")
export class TodoRecord {
  @autoGeneratedHashKey()
  id!: string;

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
  public async create(text: string): Promise<TodoRecord> {
    const toSave = Object.assign(new TodoRecord(), { text: text });
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

  public async get(id: string): Promise<TodoRecord | {}> {
    const myItem = await mapper.get(
      Object.assign(new TodoRecord(), { id: id })
    );
    return myItem;
  }

  public async update(
    id: string,
    text: string,
    checked: boolean
  ): Promise<TodoRecord> {
    const myItem = await mapper.get(
      Object.assign(new TodoRecord(), { id: id })
    );
    myItem.text = text;
    myItem.checked = checked;
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
  }

  public async ensureTableNotExists(): Promise<void> {
    await mapper.ensureTableNotExists(TodoRecord);
  }
}
