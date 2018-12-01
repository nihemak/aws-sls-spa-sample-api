import { injectable } from "inversify";
import { Todos } from "app/usecases/stores/Todos";
import { Todo } from "app/entities/Todo";

@injectable()
export class UseCaseStoreTodosMock implements Todos {
  public static create = (_userId: string, _text: string): Promise<Todo> => {
    return Promise.reject();
  };
  public create(userId: string, text: string): Promise<Todo> {
    return UseCaseStoreTodosMock.create(userId, text);
  }

  public static all = (_userId: string): Promise<Todo[]> => {
    return Promise.reject();
  };
  public all(userId: string): Promise<Todo[]> {
    return UseCaseStoreTodosMock.all(userId);
  }

  public static get = (_userId: string, _id: string): Promise<Todo | {}> => {
    return Promise.reject();
  };
  public get(userId: string, id: string): Promise<Todo | {}> {
    return UseCaseStoreTodosMock.get(userId, id);
  }

  public static update = (
    _userId: string,
    _id: string,
    _text: string,
    _checked: boolean
  ): Promise<Todo> => {
    return Promise.reject();
  };
  public update(
    userId: string,
    id: string,
    text: string,
    checked: boolean
  ): Promise<Todo> {
    return UseCaseStoreTodosMock.update(userId, id, text, checked);
  }

  public static delete = (_userId: string, _id: string): Promise<void> => {
    return Promise.reject();
  };
  public delete(userId: string, id: string): Promise<void> {
    return UseCaseStoreTodosMock.delete(userId, id);
  }

  public static createTable = (_rc: number, _wc: number): Promise<void> => {
    return Promise.resolve();
  };
  public createTable(rc: number, wc: number): Promise<void> {
    return UseCaseStoreTodosMock.createTable(rc, wc);
  }

  public static deleteTable = (): Promise<void> => {
    return Promise.resolve();
  };
  public deleteTable(): Promise<void> {
    return UseCaseStoreTodosMock.deleteTable();
  }
}
