import { describe, it } from "mocha";
import { expect } from "chai";
import { container, TYPES } from "app/providers/container";
import { Todos as TodoStore } from "app/usecases/stores/Todos";
import { System as UseCase } from "app/usecases/System";
import { SystemResetStoresInput } from "app/usecases/inputs/System";
import { SystemResetStoresOutput } from "app/usecases/outputs/System";
import { UseCaseStoreTodosMock } from "test/utils/UseCaseStoreTodosMock";

describe("usecases/System/implementations", () => {
  describe("#resetAllStores", () => {
    it("should reset all tables.", async () => {
      const readCapacity = 33;
      const writeCapacity = 58;

      let countDeleteTable = 0;
      let countCreateTable = 0;
      let countSuccess = 0;

      UseCaseStoreTodosMock.deleteTable = (): Promise<void> => {
        expect(countCreateTable).to.equal(0);
        countDeleteTable++;
        return Promise.resolve();
      };
      UseCaseStoreTodosMock.createTable = (
        rc: number,
        wc: number
      ): Promise<void> => {
        expect(countDeleteTable).to.equal(1);
        expect(rc).to.equal(readCapacity);
        expect(wc).to.equal(writeCapacity);

        countCreateTable++;
        return Promise.resolve();
      };
      container.rebind<TodoStore>(TYPES.STORE_TODOS).to(UseCaseStoreTodosMock);

      const input = new class implements SystemResetStoresInput {
        public getTodosReadCapacity(): number {
          return readCapacity;
        }
        public getTodosWriteCapacity(): number {
          return writeCapacity;
        }
      }();
      const output = new class implements SystemResetStoresOutput {
        public success(): void {
          expect(true).to.equal(true);
          countSuccess++;
        }
        public failed(_error: any): void {
          expect(true).to.equal(false);
        }
      }();
      await container
        .get<UseCase>(TYPES.USECASE_SYSTEM)
        .resetAllStores(input, output);

      expect(countCreateTable).to.equal(1);
      expect(countSuccess).to.equal(1);
    });
  });
});
