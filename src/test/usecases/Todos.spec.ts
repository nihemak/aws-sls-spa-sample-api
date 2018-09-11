import { describe, it } from "mocha";
import { expect } from "chai";
import { container, TYPES } from "../../providers/container";
import { injectable } from "inversify";
import { Todos as TodoStore } from "../../usecases/stores/Todos";
import Todo from "../../entities/todo";
import { Todos as UseCase } from "../../usecases/Todos";
import {
  TodoCreateInput,
  TodoShowInput,
  TodoUpdateInput,
  TodoDeleteInput
} from "../../usecases/inputs/Todos";
import {
  TodoCreateOutput,
  TodoListOutput,
  TodoShowOutput,
  TodoUpdateOutput,
  TodoDeleteOutput
} from "../../usecases/outputs/Todos";

@injectable()
class TodoStoreMock implements TodoStore {
  public static create = (_text: string): Promise<Todo> => {
    return Promise.reject();
  };
  public create(text: string): Promise<Todo> {
    return TodoStoreMock.create(text);
  }

  public static all = (): Promise<Todo[]> => {
    return Promise.reject();
  };
  public all(): Promise<Todo[]> {
    return TodoStoreMock.all();
  }

  public static get = (_id: string): Promise<Todo | {}> => {
    return Promise.reject();
  };
  public get(id: string): Promise<Todo | {}> {
    return TodoStoreMock.get(id);
  }

  public static update = (
    _id: string,
    _text: string,
    _checked: boolean
  ): Promise<Todo> => {
    return Promise.reject();
  };
  public update(id: string, text: string, checked: boolean): Promise<Todo> {
    return TodoStoreMock.update(id, text, checked);
  }

  public static delete = (_id: string): Promise<void> => {
    return Promise.reject();
  };
  public delete(id: string): Promise<void> {
    return TodoStoreMock.delete(id);
  }

  public createTable(_rc: number, _wc: number): Promise<void> {
    return Promise.resolve();
  }
}

describe("usecases/Todos/implementations", () => {
  describe("#create", () => {
    it("should create todo.", async () => {
      const storeTodo: Todo = {
        id: "b24bd9b3-9517-4c43-9d7e-858969ea9483",
        text: "foo",
        checked: false,
        createdAt: 1536101150360,
        updatedAt: 1536101150362
      };

      TodoStoreMock.create = (text: string): Promise<Todo> => {
        expect(text).to.equal(storeTodo.text);

        return Promise.resolve(storeTodo);
      };
      container.rebind<TodoStore>(TYPES.STORE_TODOS).to(TodoStoreMock);

      const input = new class implements TodoCreateInput {
        public getText(): string {
          return storeTodo.text;
        }
      }();
      const output = new class implements TodoCreateOutput {
        public success(todo: Todo): void {
          expect(todo).to.equal(storeTodo);
        }
      }();
      await container.get<UseCase>(TYPES.USECASE_TODOS).create(input, output);
    });
  });

  describe("#list", () => {
    it("should list todos.", async () => {
      const storeTodos: Todo[] = [];
      storeTodos.push({
        text: "foo",
        id: "FD46591-5827-4678-BC5E-15C02B48BD4B",
        checked: true,
        createdAt: 1536101188360,
        updatedAt: 1536101199360
      });
      storeTodos.push({
        text: "bar",
        id: "88D85019-AC42-408A-95FC-910E13CE79D8",
        checked: false,
        createdAt: 1536101177360,
        updatedAt: 1536199199360
      });

      TodoStoreMock.all = (): Promise<Todo[]> => {
        return Promise.resolve(storeTodos);
      };
      container.rebind<TodoStore>(TYPES.STORE_TODOS).to(TodoStoreMock);

      const output = new class implements TodoListOutput {
        public success(todos: Todo[]): void {
          expect(todos).to.equal(storeTodos);
        }
      }();
      await container.get<UseCase>(TYPES.USECASE_TODOS).list(output);
    });
  });

  describe("#show", () => {
    it("should show todo.", async () => {
      const storeTodo: Todo = {
        text: "foo",
        id: "FD46591-5827-4678-BC5E-15C02B48BD4B",
        checked: true,
        createdAt: 1536101188360,
        updatedAt: 1536101199360
      };

      TodoStoreMock.get = (id: string): Promise<Todo | {}> => {
        expect(id).to.equal(storeTodo.id);

        return Promise.resolve(storeTodo);
      };
      container.rebind<TodoStore>(TYPES.STORE_TODOS).to(TodoStoreMock);

      const input = new class implements TodoShowInput {
        public getId(): string {
          return storeTodo.id;
        }
      }();
      const output = new class implements TodoShowOutput {
        public success(todo: Todo | {}): void {
          expect(todo).to.equal(storeTodo);
        }
      }();
      await container.get<UseCase>(TYPES.USECASE_TODOS).show(input, output);
    });
  });

  describe("#update", () => {
    it("should update todo.", async () => {
      const storeTodo: Todo = {
        text: "foo",
        id: "FD46591-5827-4678-BC5E-15C02B48BD4B",
        checked: true,
        createdAt: 1536101188360,
        updatedAt: 1536101199360
      };

      TodoStoreMock.update = (
        id: string,
        text: string,
        checked: boolean
      ): Promise<Todo> => {
        expect(id).to.equal(storeTodo.id);
        expect(text).to.equal(storeTodo.text);
        expect(checked).to.equal(storeTodo.checked);

        return Promise.resolve(storeTodo);
      };
      container.rebind<TodoStore>(TYPES.STORE_TODOS).to(TodoStoreMock);

      const input = new class implements TodoUpdateInput {
        public getId(): string {
          return storeTodo.id;
        }
        public getText(): string {
          return storeTodo.text;
        }
        public getChecked(): boolean {
          return storeTodo.checked;
        }
      }();
      const output = new class implements TodoUpdateOutput {
        public success(todo: Todo): void {
          expect(todo).to.equal(storeTodo);
        }
      }();
      await container.get<UseCase>(TYPES.USECASE_TODOS).update(input, output);
    });
  });

  describe("#delete", () => {
    it("should delete todo.", async () => {
      const storeTodo = {
        id: "FD46591-5827-4678-BC5E-15C02B48BD4B"
      };

      TodoStoreMock.delete = (id: string): Promise<void> => {
        expect(id).to.equal(storeTodo.id);

        return Promise.resolve();
      };
      container.rebind<TodoStore>(TYPES.STORE_TODOS).to(TodoStoreMock);

      const input = new class implements TodoDeleteInput {
        public getId(): string {
          return storeTodo.id;
        }
      }();
      const output = new class implements TodoDeleteOutput {
        public success(): void {
          expect(true).to.equal(true);
        }
      }();
      await container.get<UseCase>(TYPES.USECASE_TODOS).delete(input, output);
    });
  });
});
