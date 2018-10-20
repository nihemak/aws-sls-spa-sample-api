import { Callback } from "aws-lambda";
import {
  TodoCreateOutput as ITodoCreateOutput,
  TodoListOutput as ITodoListOutput,
  TodoShowOutput as ITodoShowOutput,
  TodoUpdateOutput as ITodoUpdateOutput,
  TodoDeleteOutput as ITodoDeleteOutput
} from "app/usecases/outputs/Todos";
import { Todo as TodoEntity } from "app/entities/Todo";
import { Todo as TodoModel } from "app/http/models/Todo";
import { success } from "app/http/views/response";

function toModelFromEntity(todo: TodoEntity): TodoModel {
  return {
    id: todo.id,
    text: todo.text,
    checked: todo.checked,
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt
  };
}

abstract class TodoOutput {
  protected cb: Callback;

  public constructor(cb: Callback) {
    this.cb = cb;
  }
}

export class TodoCreateOutput extends TodoOutput implements ITodoCreateOutput {
  public success(todo: TodoEntity): void {
    success(this.cb, JSON.stringify(toModelFromEntity(todo)));
  }
}

export class TodoListOutput extends TodoOutput implements ITodoListOutput {
  public success(todos: TodoEntity[]): void {
    success(
      this.cb,
      JSON.stringify(
        todos.map(todo => {
          return toModelFromEntity(todo);
        })
      )
    );
  }
}

export class TodoShowOutput extends TodoOutput implements ITodoShowOutput {
  public success(todo: TodoEntity | {}): void {
    let model = {};
    if (todo) {
      model = toModelFromEntity(todo as TodoEntity);
    }
    success(this.cb, JSON.stringify(model));
  }
}

export class TodoUpdateOutput extends TodoOutput implements ITodoUpdateOutput {
  public success(todo: TodoEntity): void {
    success(this.cb, JSON.stringify(toModelFromEntity(todo)));
  }
}

export class TodoDeleteOutput extends TodoOutput implements ITodoDeleteOutput {
  public success(id: string): void {
    success(this.cb, JSON.stringify({ id }));
  }
}
