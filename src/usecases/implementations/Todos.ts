import { container, TYPES } from "../../providers/StoreContainer";
import { injectable } from "inversify";
import Todo from "../../entities/todo";
import { Todos as TodoStore } from "../stores/Todos";
import { Todos as ITodos } from "../Todos";

@injectable()
export class Todos implements ITodos {
  public async create(text: string): Promise<Todo> {
    const todo: Todo = await container.get<TodoStore>(TYPES.Todos).create(text);
    return todo;
  }

  public async list(): Promise<Todo[]> {
    const todos: Todo[] = await container.get<TodoStore>(TYPES.Todos).all();
    return todos;
  }

  public async show(id: string): Promise<Todo | {}> {
    const todo: Todo | {} = await container.get<TodoStore>(TYPES.Todos).get(id);
    return todo;
  }

  public async update(
    id: string,
    text: string,
    checked: boolean
  ): Promise<Todo> {
    const todo: Todo = await container
      .get<TodoStore>(TYPES.Todos)
      .update(id, text, checked);
    return todo;
  }

  public async delete(id: string): Promise<void> {
    await container.get<TodoStore>(TYPES.Todos).delete(id);
  }
}
