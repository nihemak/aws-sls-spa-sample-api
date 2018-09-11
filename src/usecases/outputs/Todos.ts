import Todo from "../../entities/todo";

export interface TodoCreateOutput {
  success(todo: Todo): void;
}

export interface TodoListOutput {
  success(todos: Todo[]): void;
}

export interface TodoShowOutput {
  success(todo: Todo | {}): void;
}

export interface TodoUpdateOutput {
  success(todo: Todo): void;
}

export interface TodoDeleteOutput {
  success(): void;
}
