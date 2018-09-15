import { SystemResetStoresInput as ISystemResetStoresInput } from "app/usecases/inputs/System";
import { SystemResetStoresOutput as ISystemResetStoresOutput } from "app/usecases/outputs/System";

export class SystemResetStoresInput implements ISystemResetStoresInput {
  private readCapacity: number;
  private writeCapacity: number;

  public constructor(readCapacity: number, writeCapacity: number) {
    this.readCapacity = readCapacity;
    this.writeCapacity = writeCapacity;
  }

  public getTodosReadCapacity(): number {
    return this.readCapacity;
  }
  public getTodosWriteCapacity(): number {
    return this.writeCapacity;
  }
}

export class SystemResetStoresOutput implements ISystemResetStoresOutput {
  public success(): void {
    console.log("Todos table has been created");
  }
  public failed(error: any): void {
    throw new Error("Error creating todos table: " + error);
  }
}
