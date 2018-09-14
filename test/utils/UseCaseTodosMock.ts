import { injectable } from "inversify";
import { Todos } from "app/usecases/Todos";
import {
  TodoCreateInput,
  TodoShowInput,
  TodoUpdateInput,
  TodoDeleteInput,
  TodoCreateTableInput
} from "app/usecases/inputs/Todos";
import {
  TodoCreateOutput,
  TodoListOutput,
  TodoShowOutput,
  TodoUpdateOutput,
  TodoDeleteOutput
} from "app/usecases/outputs/Todos";

@injectable()
export class UseCaseTodosMock implements Todos {
  public static create = (
    _input: TodoCreateInput,
    _output: TodoCreateOutput
  ): Promise<void> => {
    return Promise.reject();
  };
  public create(
    input: TodoCreateInput,
    output: TodoCreateOutput
  ): Promise<void> {
    return UseCaseTodosMock.create(input, output);
  }

  public static list = (_output: TodoListOutput): Promise<void> => {
    return Promise.reject();
  };
  public list(output: TodoListOutput): Promise<void> {
    return UseCaseTodosMock.list(output);
  }

  public static show = (
    _input: TodoShowInput,
    _output: TodoShowOutput
  ): Promise<void> => {
    return Promise.reject();
  };
  public show(input: TodoShowInput, output: TodoShowOutput): Promise<void> {
    return UseCaseTodosMock.show(input, output);
  }

  public static update = (
    _input: TodoUpdateInput,
    _output: TodoUpdateOutput
  ): Promise<void> => {
    return Promise.reject();
  };
  public update(
    input: TodoUpdateInput,
    output: TodoUpdateOutput
  ): Promise<void> {
    return UseCaseTodosMock.update(input, output);
  }

  public static delete = (
    _input: TodoDeleteInput,
    _output: TodoDeleteOutput
  ): Promise<void> => {
    return Promise.reject();
  };
  public delete(
    input: TodoDeleteInput,
    output: TodoDeleteOutput
  ): Promise<void> {
    return UseCaseTodosMock.delete(input, output);
  }

  public createTable(_input: TodoCreateTableInput): Promise<void> {
    return Promise.resolve();
  }
}
