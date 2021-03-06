import { container, TYPES } from "app/providers/container";
import { injectable } from "inversify";
import "reflect-metadata";
import { Todo } from "app/entities/Todo";
import { Todos as TodoStore } from "app/usecases/stores/Todos";
import { Todos as ITodos } from "app/usecases/Todos";
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

@injectable()
export class Todos implements ITodos {
  private store: TodoStore;

  public constructor() {
    this.store = container.get<TodoStore>(TYPES.STORE_TODOS);
  }

  public async create(
    input: TodoCreateInput,
    output: TodoCreateOutput
  ): Promise<void> {
    const todo: Todo = await this.store.create(
      input.getAuthUserId(),
      input.getText()
    );
    output.success(todo);
  }

  public async list(
    input: TodoListInput,
    output: TodoListOutput
  ): Promise<void> {
    const todos: Todo[] = await this.store.all(input.getAuthUserId());
    output.success(todos);
  }

  public async show(
    input: TodoShowInput,
    output: TodoShowOutput
  ): Promise<void> {
    let todo: Todo | {} = await this.store.get(input.getId());
    if (todo && (todo as Todo).userId !== input.getAuthUserId()) {
      todo = {};
    }
    output.success(todo);
  }

  public async update(
    input: TodoUpdateInput,
    output: TodoUpdateOutput
  ): Promise<void> {
    const todo: Todo | {} = await this.store.get(input.getId());
    if (todo && (todo as Todo).userId === input.getAuthUserId()) {
      const todo: Todo = await this.store.update(
        input.getId(),
        input.getText(),
        input.getChecked()
      );
      output.success(todo);
    }
  }

  public async delete(
    input: TodoDeleteInput,
    output: TodoDeleteOutput
  ): Promise<void> {
    const todoId: string = input.getId();
    const todo: Todo | {} = await this.store.get(todoId);
    if (todo && (todo as Todo).userId === input.getAuthUserId()) {
      await this.store.delete(todoId);
    }
    output.success(todoId);
  }
}
