import { TodoResetTableInput as ITodoResetTableInput } from "app/usecases/inputs/Todos";
import { TodoResetTableOutput as ITodoResetTableOutput } from "app/usecases/outputs/Todos";

export class TodoResetTableInput implements ITodoResetTableInput {
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

export class TodoResetTableOutput implements ITodoResetTableOutput {
  public success(): void {
    console.log("Todos table has been created");
  }
  public failed(error: any): void {
    throw new Error("Error creating todos table: " + error);
  }
}
