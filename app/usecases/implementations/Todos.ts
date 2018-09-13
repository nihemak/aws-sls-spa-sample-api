import { container, TYPES } from "../../providers/container";
import { injectable } from "inversify";
import "reflect-metadata";
import { Todo } from "../../entities/Todo";
import { Todos as TodoStore } from "../stores/Todos";
import { Todos as ITodos } from "../Todos";
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
export class Todos implements ITodos {
  private store: TodoStore;

  public constructor() {
    this.store = container.get<TodoStore>(TYPES.STORE_TODOS);
  }

  public async create(
    input: TodoCreateInput,
    output: TodoCreateOutput
  ): Promise<void> {
    const todo: Todo = await this.store.create(input.getText());
    output.success(todo);
  }

  public async list(output: TodoListOutput): Promise<void> {
    const todos: Todo[] = await this.store.all();
    output.success(todos);
  }

  public async show(
    input: TodoShowInput,
    output: TodoShowOutput
  ): Promise<void> {
    const todo: Todo | {} = await this.store.get(input.getId());
    output.success(todo);
  }

  public async update(
    input: TodoUpdateInput,
    output: TodoUpdateOutput
  ): Promise<void> {
    const todo: Todo = await this.store.update(
      input.getId(),
      input.getText(),
      input.getChecked()
    );
    output.success(todo);
  }

  public async delete(
    input: TodoDeleteInput,
    output: TodoDeleteOutput
  ): Promise<void> {
    await this.store.delete(input.getId());
    output.success();
  }
}