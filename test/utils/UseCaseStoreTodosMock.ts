import { injectable } from "inversify";
import { Todos } from "app/usecases/stores/Todos";
import { Todo } from "app/entities/Todo";

@injectable()
export class UseCaseStoreTodosMock implements Todos {
  public static create = (_text: string): Promise<Todo> => {
    return Promise.reject();
  };
  public create(text: string): Promise<Todo> {
    return UseCaseStoreTodosMock.create(text);
  }

  public static all = (): Promise<Todo[]> => {
    return Promise.reject();
  };
  public all(): Promise<Todo[]> {
    return UseCaseStoreTodosMock.all();
  }

  public static get = (_id: string): Promise<Todo | {}> => {
    return Promise.reject();
  };
  public get(id: string): Promise<Todo | {}> {
    return UseCaseStoreTodosMock.get(id);
  }

  public static update = (
    _id: string,
    _text: string,
    _checked: boolean
  ): Promise<Todo> => {
    return Promise.reject();
  };
  public update(id: string, text: string, checked: boolean): Promise<Todo> {
    return UseCaseStoreTodosMock.update(id, text, checked);
  }

  public static delete = (_id: string): Promise<void> => {
    return Promise.reject();
  };
  public delete(id: string): Promise<void> {
    return UseCaseStoreTodosMock.delete(id);
  }

  public createTable(_rc: number, _wc: number): Promise<void> {
    return Promise.resolve();
  }
}
