import { describe, it } from "mocha";
import { expect } from "chai";
import { container, TYPES } from "app/providers/container";
import { Todos as TodoStore } from "app/usecases/stores/Todos";
import { Todo } from "app/entities/Todo";
import { Todos as UseCase } from "app/usecases/Todos";
import {
  TodoCreateInput,
  TodoListInput,
  TodoShowInput,
  TodoUpdateInput,
  TodoDeleteInput
} from "app/usecases/inputs/Todos";
import {
  TodoCreateOutput,
  TodoListOutput,
  TodoShowOutput,
  TodoUpdateOutput,
  TodoDeleteOutput
} from "app/usecases/outputs/Todos";
import { UseCaseStoreTodosMock } from "test/utils/UseCaseStoreTodosMock";

describe("usecases/Todos/implementations", () => {
  describe("#create", () => {
    it("should create todo.", async () => {
      const userId: string = "user";
      const storeTodo: Todo = {
        id: "b24bd9b3-9517-4c43-9d7e-858969ea9483",
        userId: userId,
        text: "foo",
        checked: false,
        createdAt: 1536101150360,
        updatedAt: 1536101150362
      };

      UseCaseStoreTodosMock.create = (
        userId: string,
        text: string
      ): Promise<Todo> => {
        expect(userId).to.equal(userId);
        expect(text).to.equal(storeTodo.text);

        return Promise.resolve(storeTodo);
      };
      container.rebind<TodoStore>(TYPES.STORE_TODOS).to(UseCaseStoreTodosMock);

      const input = new class implements TodoCreateInput {
        public getAuthUserId(): string {
          return userId;
        }
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
      const userId: string = "user";
      const storeTodos: Todo[] = [];
      storeTodos.push({
        text: "foo",
        id: "FD46591-5827-4678-BC5E-15C02B48BD4B",
        userId: userId,
        checked: true,
        createdAt: 1536101188360,
        updatedAt: 1536101199360
      });
      storeTodos.push({
        text: "bar",
        id: "88D85019-AC42-408A-95FC-910E13CE79D8",
        userId: userId,
        checked: false,
        createdAt: 1536101177360,
        updatedAt: 1536199199360
      });

      UseCaseStoreTodosMock.all = (userId: string): Promise<Todo[]> => {
        expect(userId).to.equal(userId);

        return Promise.resolve(storeTodos);
      };
      container.rebind<TodoStore>(TYPES.STORE_TODOS).to(UseCaseStoreTodosMock);

      const input = new class implements TodoListInput {
        public getAuthUserId(): string {
          return userId;
        }
      }();
      const output = new class implements TodoListOutput {
        public success(todos: Todo[]): void {
          expect(todos).to.equal(storeTodos);
        }
      }();
      await container.get<UseCase>(TYPES.USECASE_TODOS).list(input, output);
    });
  });

  describe("#show", () => {
    it("should show todo.", async () => {
      const userId: string = "user";
      const storeTodo: Todo = {
        text: "foo",
        id: "FD46591-5827-4678-BC5E-15C02B48BD4B",
        userId: userId,
        checked: true,
        createdAt: 1536101188360,
        updatedAt: 1536101199360
      };

      UseCaseStoreTodosMock.get = (id: string): Promise<Todo | {}> => {
        expect(id).to.equal(storeTodo.id);

        return Promise.resolve(storeTodo);
      };
      container.rebind<TodoStore>(TYPES.STORE_TODOS).to(UseCaseStoreTodosMock);

      const input = new class implements TodoShowInput {
        public getAuthUserId(): string {
          return userId;
        }
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
      const userId: string = "user";
      const storeTodo: Todo = {
        text: "foo",
        id: "FD46591-5827-4678-BC5E-15C02B48BD4B",
        userId: userId,
        checked: true,
        createdAt: 1536101188360,
        updatedAt: 1536101199360
      };

      UseCaseStoreTodosMock.update = (
        id: string,
        text: string,
        checked: boolean
      ): Promise<Todo> => {
        expect(id).to.equal(storeTodo.id);
        expect(text).to.equal(storeTodo.text);
        expect(checked).to.equal(storeTodo.checked);

        return Promise.resolve(storeTodo);
      };
      container.rebind<TodoStore>(TYPES.STORE_TODOS).to(UseCaseStoreTodosMock);

      const input = new class implements TodoUpdateInput {
        public getAuthUserId(): string {
          return userId;
        }
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
      const userId: string = "user";
      const storeTodo = {
        id: "FD46591-5827-4678-BC5E-15C02B48BD4B"
      };

      UseCaseStoreTodosMock.delete = (id: string): Promise<void> => {
        expect(id).to.equal(storeTodo.id);

        return Promise.resolve();
      };
      container.rebind<TodoStore>(TYPES.STORE_TODOS).to(UseCaseStoreTodosMock);

      const input = new class implements TodoDeleteInput {
        public getAuthUserId(): string {
          return userId;
        }
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
