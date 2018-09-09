import Todo from "../entities/todo";

export interface Todos {
  create(text: string): Promise<Todo>;
  list(): Promise<Todo[]>;
  show(id: string): Promise<Todo | {}>;
  update(id: string, text: string, checked: boolean): Promise<Todo>;
  delete(id: string): Promise<void>;
}
