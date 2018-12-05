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

  public async create(userId: string, text: string): Promise<Todo> {
    const todo: TodoRecord = await this.table.create(userId, text);
    return this.recordToEntitiy(todo);
  }

  public async all(userId: string): Promise<Todo[]> {
    const todos: TodoRecord[] = await this.table.listByUserId(userId);
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

  public deleteTable(): Promise<void> {
    return this.table.ensureTableNotExists();
  }

  private recordToEntitiy(record: TodoRecord): Todo {
    return {
      id: record.id,
      userId: record.userId,
      text: record.text,
      checked: record.checked,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt
    };
  }
}
