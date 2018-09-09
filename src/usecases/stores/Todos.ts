import Todo from "../../entities/todo";

export interface Todos {
  create(text: string): Promise<Todo>;
  all(): Promise<Todo[]>;
  get(id: string): Promise<Todo | {}>;
  update(id: string, text: string, checked: boolean): Promise<Todo>;
  delete(id: string): Promise<void>;
  createTable(rc: number, wc: number): Promise<void>;
}
