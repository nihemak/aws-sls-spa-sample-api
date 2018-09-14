import { injectable } from "inversify";
import "reflect-metadata";
import { Todos as ITodos } from "app/usecases/stores/Todos";
import { Todo } from "app/entities/Todo";
import { TodoRecord, Todos as TodoTable } from "app/databases/Todos";

@injectable()
export class Todos implements ITodos {
  private table: TodoTable;

  public constructor() {
    this.table = new TodoTable();
  }

  public async create(text: string): Promise<Todo> {
    const todo: TodoRecord = await this.table.create(text);
    return this.recordToEntitiy(todo);
  }

  public async all(): Promise<Todo[]> {
    const todos: TodoRecord[] = await this.table.all();
    return todos.map(todo => {
      return this.recordToEntitiy(todo);
    });
  }

  public async get(id: string): Promise<Todo | {}> {
    const todo: TodoRecord | {} = await this.table.get(id);
    if (!todo) {
      return {};
    } else {
      return this.recordToEntitiy(todo as TodoRecord);
    }
  }

  public async update(
    id: string,
    text: string,
    checked: boolean
  ): Promise<Todo> {
    const todo: TodoRecord = await this.table.update(id, text, checked);
    return this.recordToEntitiy(todo);
  }

  public async delete(id: string): Promise<void> {
    return this.table.delete(id);
  }

  public async createTable(rc: number, wc: number): Promise<void> {
    return this.table.createTable(rc, wc);
  }

  private recordToEntitiy(record: TodoRecord): Todo {
    return {
      id: record.id,
      text: record.text,
      checked: record.checked,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt
    };
  }
}
