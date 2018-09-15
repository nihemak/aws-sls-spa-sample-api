import { container, TYPES } from "app/providers/container";
import { injectable } from "inversify";
import "reflect-metadata";
import { Todos as TodoStore } from "app/usecases/stores/Todos";
import { System as ISystem } from "app/usecases/System";
import { SystemResetStoresInput } from "app/usecases/inputs/System";
import { SystemResetStoresOutput } from "app/usecases/outputs/System";

@injectable()
export class System implements ISystem {
  private todoStore: TodoStore;

  public constructor() {
    this.todoStore = container.get<TodoStore>(TYPES.STORE_TODOS);
  }

  public async resetAllStores(
    input: SystemResetStoresInput,
    output: SystemResetStoresOutput
  ): Promise<void> {
    try {
      await this.todoStore.deleteTable();
      await this.todoStore.createTable(
        input.getTodosReadCapacity(),
        input.getTodosWriteCapacity()
      );
      output.success();
    } catch (err) {
      output.failed(err);
    }
  }
}
