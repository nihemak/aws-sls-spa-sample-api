import { TodoCreateTableInput as ITodoCreateTableInput } from "app/usecases/inputs/Todos";
import { TodoCreateTableOutput as ITodoCreateTableOutput } from "app/usecases/outputs/Todos";

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

export class TodoCreateTableOutput implements ITodoCreateTableOutput {
  public success(): void {
    console.log("Todos table has been created");
  }
  public failed(error: any): void {
    throw new Error("Error creating todos table: " + error);
  }
}
