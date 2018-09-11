import { Callback } from "aws-lambda";
import {
  TodoCreateOutput as ITodoCreateOutput,
  TodoListOutput as ITodoListOutput,
  TodoShowOutput as ITodoShowOutput,
  TodoUpdateOutput as ITodoUpdateOutput,
  TodoDeleteOutput as ITodoDeleteOutput
} from "../../../usecases/outputs/Todos";
import Todo from "../../../entities/todo";

export class TodoCreateOutput implements ITodoCreateOutput {
  private cb: Callback;

  public constructor(cb: Callback) {
    this.cb = cb;
  }

  public success(todo: Todo): void {
    this.cb(null, {
      statusCode: 200,
      body: JSON.stringify(todo)
    });
  }
}

export class TodoListOutput implements ITodoListOutput {
  private cb: Callback;

  public constructor(cb: Callback) {
    this.cb = cb;
  }

  public success(todos: Todo[]): void {
    this.cb(null, {
      statusCode: 200,
      body: JSON.stringify(todos)
    });
  }
}

export class TodoShowOutput implements ITodoShowOutput {
  private cb: Callback;

  public constructor(cb: Callback) {
    this.cb = cb;
  }

  public success(todo: Todo | {}): void {
    this.cb(null, {
      statusCode: 200,
      body: JSON.stringify(todo)
    });
  }
}

export class TodoUpdateOutput implements ITodoUpdateOutput {
  private cb: Callback;

  public constructor(cb: Callback) {
    this.cb = cb;
  }

  public success(todo: Todo): void {
    this.cb(null, {
      statusCode: 200,
      body: JSON.stringify(todo)
    });
  }
}

export class TodoDeleteOutput implements ITodoDeleteOutput {
  private cb: Callback;

  public constructor(cb: Callback) {
    this.cb = cb;
  }

  public success(): void {
    this.cb(null, {
      statusCode: 200,
      body: JSON.stringify({})
    });
  }
}
