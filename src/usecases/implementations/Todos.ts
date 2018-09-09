import { container, TYPES } from "../../providers/container";
import { injectable } from "inversify";
import "reflect-metadata";
import Todo from "../../entities/todo";
import { Todos as TodoStore } from "../stores/Todos";
import { Todos as ITodos } from "../Todos";

@injectable()
export class Todos implements ITodos {
  private store: TodoStore;

  public constructor() {
    this.store = container.get<TodoStore>(TYPES.STORE_TODOS);
  }

  public async create(text: string): Promise<Todo> {
    const todo: Todo = await this.store.create(text);
    return todo;
  }

  public async list(): Promise<Todo[]> {
    const todos: Todo[] = await this.store.all();
    return todos;
  }

  public async show(id: string): Promise<Todo | {}> {
    const todo: Todo | {} = await this.store.get(id);
    return todo;
  }

  public async update(
    id: string,
    text: string,
    checked: boolean
  ): Promise<Todo> {
    const todo: Todo = await this.store.update(id, text, checked);
    return todo;
  }

  public async delete(id: string): Promise<void> {
    await this.store.delete(id);
  }
}
