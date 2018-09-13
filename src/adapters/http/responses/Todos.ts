import { Callback } from "aws-lambda";
import {
  TodoCreateOutput as ITodoCreateOutput,
  TodoListOutput as ITodoListOutput,
  TodoShowOutput as ITodoShowOutput,
  TodoUpdateOutput as ITodoUpdateOutput,
  TodoDeleteOutput as ITodoDeleteOutput
} from "../../../usecases/outputs/Todos";
import { Todo as TodoEntity } from "../../../entities/todo";
import { Todo as TodoModel } from "../../../http/models/Todo";

function toModelFromEntity(todo: TodoEntity): TodoModel {
  return {
    id: todo.id,
    text: todo.text,
    checked: todo.checked,
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt
  };
}

export class TodoCreateOutput implements ITodoCreateOutput {
  private cb: Callback;

  public constructor(cb: Callback) {
    this.cb = cb;
  }

  public success(todo: TodoEntity): void {
    this.cb(null, {
      statusCode: 200,
      body: JSON.stringify(toModelFromEntity(todo))
    });
  }
}

export class TodoListOutput implements ITodoListOutput {
  private cb: Callback;

  public constructor(cb: Callback) {
    this.cb = cb;
  }

  public success(todos: TodoEntity[]): void {
    this.cb(null, {
      statusCode: 200,
      body: JSON.stringify(
        todos.map(todo => {
          return toModelFromEntity(todo);
        })
      )
    });
  }
}

export class TodoShowOutput implements ITodoShowOutput {
  private cb: Callback;

  public constructor(cb: Callback) {
    this.cb = cb;
  }

  public success(todo: TodoEntity | {}): void {
    let model = {};
    if (todo) {
      model = toModelFromEntity(todo as TodoEntity);
    }
    this.cb(null, {
      statusCode: 200,
      body: JSON.stringify(model)
    });
  }
}

export class TodoUpdateOutput implements ITodoUpdateOutput {
  private cb: Callback;

  public constructor(cb: Callback) {
    this.cb = cb;
  }

  public success(todo: TodoEntity): void {
    this.cb(null, {
      statusCode: 200,
      body: JSON.stringify(toModelFromEntity(todo))
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
