import { TodoCreateTableInput as ITodoCreateTableInput } from "app/usecases/inputs/Todos";

export class TodoCreateTableInput implements ITodoCreateTableInput {
  private readCapacity: number;
  private writeCapacity: number;

  public constructor(readCapacity: number, writeCapacity: number) {
    this.readCapacity = readCapacity;
    this.writeCapacity = writeCapacity;
  }

  public getReadCapacity(): number {
    return this.readCapacity;
  }
  public getWriteCapacity(): number {
    return this.writeCapacity;
  }
}
