import { Todo } from "app/entities/Todo";

export interface Todos {
  create(userId: string, text: string): Promise<Todo>;
  all(userId: string): Promise<Todo[]>;
  get(userId: string, id: string): Promise<Todo | {}>;
  update(
    userId: string,
    id: string,
    text: string | undefined,
    checked: boolean | undefined
  ): Promise<Todo>;
  delete(userId: string, id: string): Promise<void>;
  createTable(rc: number, wc: number): Promise<void>;
  deleteTable(): Promise<void>;
}
